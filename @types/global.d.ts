import { HttpRequest as AzureHttpRequest } from '@azure/functions'

interface HttpRequest extends AzureHttpRequest {
    readonly body?: unknown;
}

type HttpResponse = {
    readonly status: number;
    readonly body?: any;
    readonly [key: string]: any;
}

type RequestBody = {
    readonly message: {
        readonly type: string;
        readonly operation: string;
    }
    readonly data: any;
}
