import { success, error } from '../../src/lib/response';

describe('Response lib', () => {
    it('should return the correct success message', async () => {
        const response = success({
            message: 'Success',
        });
        expect(response).toEqual({
            statusCode: 200,
            body: JSON.stringify({
                message: 'Success',
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
        });
    });

    it('should return the correct status code for success', async () => {
        const response = success({
            message: 'Success',
        }, 201);
        expect(response).toEqual({
            statusCode: 201,
            body: JSON.stringify({
                message: 'Success',
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
        });
    });

    it('should return correct successful response with default values', async () => {
        const response = success();
        expect(response).toEqual({
            statusCode: 200,
            body: JSON.stringify({}),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
        });
    });


    it('should return the correct error message', async () => {
        const response = error({
            message: 'Error',
        });
        expect(response).toEqual({
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error',
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
        });
    });

    it('should return the correct status code for error', async () => {
        const response = error({
            message: 'Error',
        }, 400);
        expect(response).toEqual({
            statusCode: 400,
            body: JSON.stringify({
                message: 'Error',
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
        });
    });

    it('should return correct error response with default values', async () => {
        const response = error();
        expect(response).toEqual({
            statusCode: 500,
            body: JSON.stringify({}),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
        });
    });
});
