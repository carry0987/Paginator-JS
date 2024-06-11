import { ProcessorType } from '@/type/processor';
import { ServerStorageOptions } from '@/interface/storage';
import { Processor, ProcessorProps } from '@carry0987/pipeline';

interface ServerInitiatorProps extends ProcessorProps {
    serverStorageOptions: ServerStorageOptions;
}

class ServerInitiator extends Processor<ServerStorageOptions, ProcessorType, ServerInitiatorProps> {
    public get type(): ProcessorType {
        return ProcessorType.Initiator;
    }

    protected async _process(): Promise<ServerStorageOptions> {
        return Object.entries(this.props.serverStorageOptions)
            .filter(([_, val]) => typeof val !== 'function')
            .reduce(
                (acc, [k, v]) => ({ ...acc, [k]: v }),
                {}
            ) as ServerStorageOptions;
    }
}

export default ServerInitiator;
