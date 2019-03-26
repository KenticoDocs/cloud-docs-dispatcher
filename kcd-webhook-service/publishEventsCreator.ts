import { EventGridClient, EventGridModels } from 'azure-eventgrid';
import url from 'url';

interface IDeps {
  readonly host: string;
  readonly eventGridClient: EventGridClient;
}

export const publishEventsCreator = (dependencies: IDeps) =>
  async (events: EventGridModels.EventGridEvent[]): Promise<void> => {
    const docsChangedHost = url.parse(dependencies.host, true).host;
    if (!docsChangedHost) {
      throw new Error('Host property is not defined');
    }

    return dependencies.eventGridClient.publishEvents(docsChangedHost, events);
  };
