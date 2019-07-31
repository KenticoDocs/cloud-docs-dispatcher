import { HttpRequest } from '@azure/functions/Interfaces';
import { Operation } from '../enums/Operation';

export class Configuration {
    public static eventGridKey: string;
    public static eventGridHost: string;

    public static set(request: HttpRequest): void {
        const isWorkflowStepChange = request.body.message.operation === Operation.ChangeWorkflowStep;

        this.eventGridKey = (isWorkflowStepChange
            ? process.env['EventGrid.WorkflowChanged.Key']
            : process.env['EventGrid.DocsChanged.Key']) || '';
        this.eventGridHost = (isWorkflowStepChange
            ? process.env['EventGrid.WorkflowChanged.Endpoint']
            : process.env['EventGrid.DocsChanged.Endpoint']) || '';
    }
}
