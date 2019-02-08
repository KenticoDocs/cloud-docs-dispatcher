const eventComposer = require('./eventComposer');

const webhookBody = {
    message: {
        operation: 'someOperation'
    },
    data: {
        xxx: 'xxx',
        yyy: 'yyy'
    }
};

describe('eventComposer', () => {
    test('composes event with data from webhook', async () => {
        const eventType = 'kentico';
        const isTest = null;
        const event = eventComposer(webhookBody, eventType, isTest);

        expect(event.id).toBeTruthy;
        expect(event.isTest).toBe(false);
        expect(event.subject).toBe(webhookBody.message.operation);
        expect(event.eventType).toBe(eventType);
        expect(event.dataVersion).toBe('1.0');
        expect(event.data).toBe(webhookBody.data);
        expect(event.eventTime).toBeTruthy;
    });

    test('composes event with invalid type', async () => {
        const eventType = 'notKentico';
        const isTest = null;
        const event = eventComposer({}, eventType, isTest);

        expect(event.id).toBeTruthy;
        expect(event.isTest).toBe(false);
        expect(event.subject).toBe(eventType);
        expect(event.eventType).toBe(eventType);
        expect(event.dataVersion).toBe('1.0');
        expect(event.data).toBeNull;
        expect(event.eventTime).toBeTruthy;
    });

    test('composes event with testing configuration', async () => {
        const eventType = 'kentico';
        const isTest = true;
        const event = eventComposer(webhookBody, eventType, isTest);

        expect(event.id).toBeTruthy;
        expect(event.isTest).toBe(true);
        expect(event.subject).toBe(webhookBody.message.operation);
        expect(event.eventType).toBe(eventType);
        expect(event.dataVersion).toBe('1.0');
        expect(event.data).toBe(webhookBody.data);
        expect(event.eventTime).toBeTruthy;
    });
});
