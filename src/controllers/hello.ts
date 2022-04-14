import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { success, error } from '../lib/response';

import { getName } from '../functions/utils';
import { RequestBody } from '../types';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const request = JSON.parse(event.body || '{}') as RequestBody;

    const name = getName(request);
    const response = {
      message: `Hello ${name}!`,
    };

    return success(response);
  } catch (e) {
    return error({ errorMessage: 'invalid payload' }, 404);
  }
};
