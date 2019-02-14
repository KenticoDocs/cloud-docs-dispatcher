const getUuid = require('uuid').v4;

module.exports = (webhookBody, eventType, isTest) => {
    return {
        id: getUuid(),
        test: isTest === 'true',
        subject: webhookBody.message.operation,
        eventType: eventType,
        dataVersion: '1.0',
        data: webhookBody.data,
        eventTime: new Date()
    };
};
