import { EventGridModels } from 'azure-eventgrid';
import getUuid from 'uuid';
import { RequestBody } from '../@types/global';

export const eventComposer = (
  webhookBody: RequestBody,
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
    eventType: 'kentico-kontent',
    id: getUuid(),
    subject: webhookBody.message.operation
  };
};
