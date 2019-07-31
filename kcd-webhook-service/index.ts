import {
    AzureFunction,
    Context,
} from '@azure/functions';
import {
    HttpRequest,
    HttpResponse,
} from '../@types/global';
import { Configuration } from './Configuration';
import {
    isRequestBodyValid,
    publishEventWithWebhookData,
    shouldIgnoreRequest,
} from './helpers';

const parseWebhook: AzureFunction = async (context: Context, request: HttpRequest): Promise<HttpResponse> => {
    try {
        if (!isRequestBodyValid(request.body)) {
            throw new Error('Received invalid message body');
        }

        if (shouldIgnoreRequest(request.body)) {
            return {
                body: 'Nothing published',
                status: 200,
            };
        }

        Configuration.set(request);

        const event = await publishEventWithWebhookData(request);

        return {
            body: event,
            status: 200,
        };
    } catch (error) {
        /** This try-catch is required for correct logging of exceptions in Azure */
        throw `Message: ${error.message} \nStack Trace: ${error.stack}`;
    }
};

export default parseWebhook;
