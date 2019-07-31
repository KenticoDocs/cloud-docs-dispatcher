import { HttpRequest } from '@azure/functions/Interfaces';
import { EventGridModels } from 'azure-eventgrid';
import getUuid from 'uuid';

export const eventComposer = ({body, query: {test}}: HttpRequest): EventGridModels.EventGridEvent => ({
    data: {
        test: test === 'enabled' ? test : 'disabled',
        webhook: body.data,
    },
    dataVersion: '1.0',
    eventTime: new Date(),
    eventType: 'kentico-cloud',
    id: getUuid(),
    subject: body.message.operation,
});
