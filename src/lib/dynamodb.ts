import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { captureAWSClient } from 'aws-xray-sdk-core';

/*
 * This is a helper to make it easier to use the AWS SDK for DynamoDB.
 *
 * The aws sdk developers decided to introduce v3 of their library,
 * which uses the dynamodb client (different than the dynamodb document client).
 * If you use the first, you won't be able to pass normal objects to the putItem method.
 * You would need to marshal the object first which sucks balls...
 * Same goes when you get items - you will need to unmarshall the object first
 * That's why you would want to use the dynamodb document client.
 * Read the full discussion here: https://github.com/aws/aws-sdk-js-v3/issues/1223
 */

export const dbOptions = (): object => {
  return process.env.JEST_WORKER_ID || process.env.IS_OFFLINE
    ? {
        endpoint: 'http://localhost:8881', //to do - port should be in env
        region: 'local-env',
      }
    : {};
};

const dynamoDb = new DynamoDB(dbOptions());

// only wrap dynamodb if the code is ran in the cloud, meaning x_amzn_trace_id is present
const xRayWrapped = process.env._X_AMZN_TRACE_ID ? captureAWSClient(dynamoDb) : dynamoDb;
const client = DynamoDBDocumentClient.from(xRayWrapped);

export default client;
