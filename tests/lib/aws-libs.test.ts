import client, { dbOptions } from '../../src/lib/dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';


describe('Response lib', () => {
    test('client should be instance of dynamodb document', async () => {
        expect(client).toBeInstanceOf(DynamoDBDocumentClient);
    });

    test('client should be instance of dynamodb document', async () => {
        process.env.IS_OFFLINE = 'true';
        expect(client).toBeInstanceOf(DynamoDBDocumentClient);
    });

    test('loadOptions should return correct object', async () => {
        expect(dbOptions()).toEqual({
            endpoint: 'http://localhost:8881', //to do - port should be in env
            region: 'local-env',
        });
    });

    test('loadOptions should return correct object', async () => {
        delete process.env.JEST_WORKER_ID
        delete process.env.IS_OFFLINE

        expect(dbOptions()).toEqual({});
        process.env.JEST_WORKER_ID = '1'; //reset jest_worker_id
    });
});
