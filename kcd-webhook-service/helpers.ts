import EventGridClient from 'azure-eventgrid';
import { TopicCredentials } from 'ms-rest-azure';
import {
    HttpRequest,
    RequestBody,
} from '../@types/global';
import { Operation } from '../enums/Operation';
import { Configuration } from './Configuration';
import { eventComposer } from './eventComposer';
import { publishEventsCreator } from './publishEventsCreator';

export const isRequestBodyValid = (body: any): body is RequestBody =>
    body
    && body.message
    && body.message.type
    && body.message.operation
    && body.data;

export const shouldIgnoreRequest = ({ message: { type, operation } }: RequestBody): boolean =>
    type === 'content_item' && operation !== Operation.Upsert;

export const publishEventWithWebhookData = async (request: HttpRequest) => {
    const topicCredentials = new TopicCredentials(Configuration.eventGridKey);
    const eventGridClient = new EventGridClient(topicCredentials);
    const publishEvents = publishEventsCreator({eventGridClient, host: Configuration.eventGridHost});

    const event = eventComposer(request);
    await publishEvents([event]);

    return event;
};
