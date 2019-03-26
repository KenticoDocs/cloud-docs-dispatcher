import { AzureFunction, Context } from '@azure/functions';
import EventGridClient from 'azure-eventgrid';
import { TopicCredentials } from 'ms-rest-azure';
import { HttpRequest, HttpResponse, RequestBody } from '../@types/global';
import { eventComposer } from './eventComposer';
import { publishEventsCreator } from './publishEventsCreator';

const isRequestBodyValid = (body: any): body is RequestBody =>
  body
  && body.message
  && body.message.type
  && body.message.operation
  && body.data;

const shouldIgnoreRequest = ({ message: { type, operation } }: RequestBody): boolean =>
  type === 'content_item' && operation !== 'upsert';

const parseWebhook: AzureFunction = async (
  _context: Context,
  request: HttpRequest
): Promise<HttpResponse> => {
  if (request.query.source !== 'kentico-cloud') {
    return {
      body: 'Request not valid',
      status: 400
    };
  }

  if (!isRequestBodyValid(request.body)) {
    throw new Error('Received invalid message body');
  }

  if (shouldIgnoreRequest(request.body)) {
    return {
      body: 'Nothing published',
      status: 200
    };
  }

  const eventGridKey = process.env['EventGrid.DocsChanged.Key'];
  const host = process.env['EventGrid.DocsChanged.Endpoint'];
  if (!eventGridKey || !host) {
    throw new Error('Undefined env property provided');
  }

  const topicCredentials = new TopicCredentials(eventGridKey);
  const eventGridClient = new EventGridClient(topicCredentials);
  const publishEvents = publishEventsCreator({ eventGridClient, host });

  const event = eventComposer(request.body, request.query.source, request.query.test);
  await publishEvents([event]);

  return {
    body: event,
    status: 200
  };
};

export default parseWebhook;
