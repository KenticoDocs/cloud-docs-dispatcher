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

describe('eventComposer', () => {
  test('composes event with data from webhook', async () => {
    const eventType = 'kentico-cloud';
    const isTest = undefined;
    const event = eventComposer(webhookBody, eventType, isTest);

    expect(event.id).toBeTruthy();
    expect(event.subject).toBe(webhookBody.message.operation);
    expect(event.eventType).toBe(eventType);
    expect(event.dataVersion).toBe('1.0');
    expect(event.data.webhook).toBe(webhookBody.data);
    expect(event.data.test).toBe('disabled');
    expect(event.eventTime).toBeTruthy();
  });

  test('composes event with testing configuration', async () => {
    const eventType = 'kentico';
    const isTest = 'enabled';
    const event = eventComposer(webhookBody, eventType, isTest);

    expect(event.id).toBeTruthy();
    expect(event.subject).toBe(webhookBody.message.operation);
    expect(event.eventType).toBe(eventType);
    expect(event.dataVersion).toBe('1.0');
    expect(event.data.webhook).toBe(webhookBody.data);
    expect(event.data.test).toBe('enabled');
    expect(event.eventTime).toBeTruthy();
  });

  test('composes event with incorrect testing configuration', async () => {
    const eventType = 'kentico';
    const isTest = 'something';
    const event = eventComposer(webhookBody, eventType, isTest);

    expect(event.id).toBeTruthy();
    expect(event.subject).toBe(webhookBody.message.operation);
    expect(event.eventType).toBe(eventType);
    expect(event.data.webhook).toBe(webhookBody.data);
    expect(event.data.test).toBe('disabled');
    expect(event.eventTime).toBeTruthy();
  });
});
