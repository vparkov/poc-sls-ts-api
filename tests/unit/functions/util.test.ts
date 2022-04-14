import { getName } from '../../../src/functions/utils';

describe('Testing utils', () => {
    it('should return correct data', async () => {
        const result = getName({ name: 'test', country: 'test' });

        expect(result).toEqual('test');
    });
    it('should throw correct exception', async () => {
        expect(() => {
            getName({ name: 'tes', country: 'test' });
        }).toThrow('name is too short :/');
    });
});