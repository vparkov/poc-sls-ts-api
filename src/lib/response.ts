import { APIGatewayProxyResult } from 'aws-lambda';

const response = (body: object, statusCode: number): APIGatewayProxyResult => ({
  statusCode,
  body: JSON.stringify(body),
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
});

const success = (body = {}, statusCode = 200): APIGatewayProxyResult => response(body, statusCode);

const error = (body = {}, statusCode = 500): APIGatewayProxyResult => response(body, statusCode);

export { success, error };
