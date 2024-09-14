import { ProcessorType } from '@/type/processor';
import { ServerStorageOptions } from '@/interface/storage';
import { Processor, ProcessorProps } from '@carry0987/pipeline';

interface ServerPaginationLimitProps extends ProcessorProps {
    page: number;
    limit: number;
    url?: (prevUrl: string, page: number, limit: number) => string;
    body?: (prevBody: BodyInit, page: number, limit: number) => BodyInit;
}

class ServerPaginationLimit extends Processor<ServerStorageOptions, ProcessorType, ServerPaginationLimitProps> {
    public get type(): ProcessorType {
        return ProcessorType.ServerLimit;
    }

    protected async _process(options: ServerStorageOptions): Promise<ServerStorageOptions> {
        const updates: Partial<ServerStorageOptions> = {};

        if (this.props.url) {
            updates['url'] = this.props.url(options.url, this.props.page, this.props.limit);
        }

        if (this.props.body) {
            updates['body'] = this.props.body(options.body as BodyInit, this.props.page, this.props.limit);
        }

        return {
            ...options,
            ...updates,
        };
    }
}

export default ServerPaginationLimit;
