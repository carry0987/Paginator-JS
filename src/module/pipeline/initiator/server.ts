import { PipelineProcessor } from '../processor';
import { ProcessorType } from '../../../type/pipeline';
import { ServerStorageOptions } from '../../../interface/storage';
import { PipelineProcessorProps } from '../../../interface/pipeline';

interface ServerInitiatorProps extends PipelineProcessorProps {
    serverStorageOptions: ServerStorageOptions;
}

class ServerInitiator extends PipelineProcessor<
    ServerStorageOptions,
    ServerInitiatorProps
> {
    get type(): ProcessorType {
        return ProcessorType.Initiator;
    }

    _process(): ServerStorageOptions {
        return Object.entries(this.props.serverStorageOptions)
            .filter(([_, val]) => typeof val !== 'function')
            .reduce(
                (acc, [k, v]) => ({ ...acc, [k]: v }),
                {}
            ) as ServerStorageOptions;
    }
}

export default ServerInitiator;
