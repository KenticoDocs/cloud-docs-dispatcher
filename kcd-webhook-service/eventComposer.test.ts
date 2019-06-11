import { eventComposer } from './eventComposer';

const webhookBody = {
  data: {
    xxx: 'xxx',
    yyy: 'yyy'
  },
  message: {
    operation: 'someOperation',
    type: ''
  }
};
const eventType = 'kentico-cloud';

describe('eventComposer', () => {
  test('composes event with data from webhook', async () => {
    const isTest = undefined;
    const event = eventComposer(webhookBody, isTest);

    expect(event.id).toBeTruthy();
    expect(event.subject).toBe(webhookBody.message.operation);
    expect(event.eventType).toBe(eventType);
    expect(event.dataVersion).toBe('1.0');
    expect(event.data.webhook).toBe(webhookBody.data);
    expect(event.data.test).toBe('disabled');
    expect(event.eventTime).toBeTruthy();
  });

  test('composes event with testing configuration', async () => {
    const isTest = 'enabled';
    const event = eventComposer(webhookBody, isTest);

    expect(event.id).toBeTruthy();
    expect(event.subject).toBe(webhookBody.message.operation);
    expect(event.eventType).toBe(eventType);
    expect(event.dataVersion).toBe('1.0');
    expect(event.data.webhook).toBe(webhookBody.data);
    expect(event.data.test).toBe('enabled');
    expect(event.eventTime).toBeTruthy();
  });

  test('composes event with incorrect testing configuration', async () => {
    const isTest = 'something';
    const event = eventComposer(webhookBody, isTest);

    expect(event.id).toBeTruthy();
    expect(event.subject).toBe(webhookBody.message.operation);
    expect(event.eventType).toBe(eventType);
    expect(event.dataVersion).toBe('1.0');
    expect(event.data.webhook).toBe(webhookBody.data);
    expect(event.data.test).toBe('disabled');
    expect(event.eventTime).toBeTruthy();
  });
});
