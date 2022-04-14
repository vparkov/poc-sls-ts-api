#!/usr/bin/env bash

# Builds the project in development mode.
# This script is needed because we need to run docker compose and start the dynamodb gui, 
# which are both blocking the main thread. This means that if you try to run them with npm-run-all, 
# docker compose will execute, but since it blocks the thread, the process never actually finishes, 
# so the second command won't execute.
# This script runs all processes in parallel. 

# The wait at the end is so that we wait for all commands to complete, so that CTRL+C kills all proccesses,
# and not just the last one.

# See (https://unix.stackexchange.com/questions/107400/ctrl-c-with-two-simultaneous-commands-in-bash)



# This needs to be eddited by project. It should be the name of the service, because docker will create the container
# base on that name.
CONTAINER_NAME='restaurants-api'

# Sometimes stopping the script with ctrl+c doesn't work, so we need to use the following command to kill all processes.
# It is getting the PID of the processes running on port 3000 (serverless offline) and 8882 (dynamodb gui).
# It is a bit harsh, I know, but my knowledge of bash is limited, so I'm not sure how to do it better.
# Feel free to rework this script :D
function cleanup() {
  echo "Cleaning up..."
  echo $CONTAINER_NAME

  # if there is docker container with name that includes "dynamodb-local", run docker-compose down
  # and remove the container
  if [[ $(docker ps -a | grep $CONTAINER_NAME) ]]; then
    echo "=======Running docker-compose down...======="
    docker-compose down
  fi

  # kill process if there is something running on port 3000 and 8882
  if [ "$(lsof -i :3000)" ]; then
    echo "=======Killing process on port 3000...======="
    kill $(lsof -i :3000 -t)
  fi

  if [ "$(lsof -i :8882)" ]; then
    echo "=======Killing process on port 8882...======="
    kill $(lsof -i :8882 -t)
  fi
}

trap cleanup INT

npm run db:start-dynamodb-container & DOCKER_PID=$! &
npm run db:dynamodb-admin & ADMIN_PID=$! &
npm run dev:serverless-offline & SLS_PID=$! &
npm run db:migrate &
npm run db:seed &
wait
echo "done"

