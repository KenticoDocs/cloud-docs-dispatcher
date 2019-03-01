const url = require('url');

module.exports = dependencies =>
    async (events) => {
        const docsChangedHost = url.parse(dependencies.host, true).host; // eslint-disable-line node/no-deprecated-api
        return dependencies.eventGridClient.publishEvents(docsChangedHost, events);
    };
