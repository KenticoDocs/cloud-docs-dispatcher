import { EventGridModels } from 'azure-eventgrid';
import getUuid from 'uuid';
import { RequestBody } from '../@types/global';

export const eventComposer = (
  webhookBody: RequestBody,
  eventType: string,
  test?: string
): EventGridModels.EventGridEvent => {
  const isTest = test === 'enabled' ? 'enabled' : 'disabled';

  return {
    data: {
      test: isTest,
      webhook: webhookBody.data
    },
    dataVersion: '1.0',
    eventTime: new Date(),
    eventType,
    id: getUuid(),
    subject: webhookBody.message.operation
  };
};
