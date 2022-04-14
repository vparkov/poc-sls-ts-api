import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import dynamodb from '../lib/dynamodb';

import { success, error } from '../lib/response';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const userId = event.pathParameters?.userId as string;

    const user = await dynamodb.send(
      new GetCommand({
        TableName: process.env.DEMO_DYNAMODB_TABLE,
        Key: {
          id: userId,
        },
      })
    );

    return success(user.Item);
  } catch (e) {
    return error({ errorMessage: 'invalid payload' }, 404);
  }
};
