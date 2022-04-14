import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import dynamodb from '../lib/dynamodb';
import { v4 as uuidv4 } from 'uuid';

import { success, error } from '../lib/response';

import { getName } from '../functions/utils';
import { RequestBody } from '../types';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const request = JSON.parse(event.body || '{}') as RequestBody;

    const name = getName(request);

    await dynamodb.send(
      new PutCommand({
        TableName: process.env.DEMO_DYNAMODB_TABLE,
        Item: {
          id: uuidv4(),
          name,
        },
      })
    );

    return success({});
  } catch (e) {
    return error({ errorMessage: 'invalid payload' }, 404);
  }
};
