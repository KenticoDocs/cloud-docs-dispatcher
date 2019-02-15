const getUuid = require('uuid').v4;

module.exports = (webhookBody, eventType, test) => {
    return {
        id: getUuid(),
        test,
        subject: webhookBody.message.operation,
        eventType: eventType,
        dataVersion: '1.0',
        data: webhookBody.data,
        eventTime: new Date()
    };
};
