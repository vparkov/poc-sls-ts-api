import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { success, error } from '../lib/response';

import { getName } from '../functions/utils';
import { RequestBody } from '../types';

// eslint-disable-next-line @typescript-eslint/require-await
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const request = JSON.parse(event.body || '{}') as RequestBody;

    const name = getName(request);
    const response = {
      message: `Hello ${name}!`,
    };

    return success(response);
  } catch (e) {
    const errorObject = e as Error;
    const message: string = errorObject.message || 'something went wrong :(';

    return error({ errorMessage: message }, 404);
  }
};
