const getUuid = require('uuid').v4;

module.exports = (webhookBody, eventType, test) => {
    const isTest = test === 'enabled' ? 'enabled' : 'disabled';
    
    return {
        id: getUuid(),
        subject: webhookBody.message.operation,
        eventType,
        dataVersion: '1.0',
        data: {
          test: isTest,
          webhook: webhookBody.data,
        },
        eventTime: new Date()
    };
};
