import azureFunction from './index';

describe('Azure function fails', () => {
    let context = {};

    beforeEach(() => {
        context = {
            done: jest.fn(),
            res: null,
        };
    });

    test('returns 200 but does nothing on kentico-cloud and content_item', async () => {
        const request = {
            body: {
                data: 'anything',
                message: {
                    operation: 'anything',
                    type: 'content_item',
                },
            },
            query: {
                source: 'kentico-cloud',
            },
        };

        const response = await azureFunction(context as any, request, null);

        expect(response.status).toBe(200);
        expect(response.body).toBe('Nothing published');
    });
});
