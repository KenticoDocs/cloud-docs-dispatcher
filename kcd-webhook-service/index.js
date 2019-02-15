const EventGridClient = require('azure-eventgrid');
const msRestAzure = require('ms-rest-azure');
const publishEventsCreator = require('./publishEventsCreator');
const eventComposer = require('./eventComposer');

module.exports = async (context, request) => {
    if (request.query.source !== 'kentico-cloud') {
        context.res = {
            status: 400,
            body: 'Request not valid'
        };

        return;
    }

    if (request.body.message.type === 'content_item') {
        context.res = {
            status: 200,
            body: 'Nothing published'
        };

        return;
    }

    const topicCredentials = new msRestAzure.TopicCredentials(process.env['EventGrid.DocsChanged.Key']);
    const eventGridClient = new EventGridClient(topicCredentials);
    const publishEvents = publishEventsCreator({ eventGridClient, host: process.env['EventGrid.DocsChanged.Endpoint'] });

    var event = eventComposer(request.body, request.query.source, request.query.test);
    await publishEvents([event]);

    context.res = {
        status: 200,
        body: event
    };
};
