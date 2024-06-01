import { Config } from '../../component/config';
import { Pipeline } from '@carry0987/pipeline';
import StorageExtractor from './extractor/storage';
import ArrayToTabularTransformer from './transformer/arrayToTabular';
import ServerStorage from '../storage/server';
import ServerInitiator from './initiator/server';
import StorageResponseToArrayTransformer from './transformer/storageResponseToArray';
import { ProcessorType } from '../../type/pipeline';

class PipelineUtils {
    static createFromConfig(config: Config): Pipeline<any, ProcessorType> {
        const pipeline = new Pipeline<any, ProcessorType>();

        if (config.options.storage instanceof ServerStorage) {
            pipeline.register(
                new ServerInitiator({
                    serverStorageOptions: config.options.server,
                })
            );
        }

        pipeline.register(new StorageExtractor({ storage: config.storage }));
        pipeline.register(
            new StorageResponseToArrayTransformer({ header: config.header })
        );
        pipeline.register(new ArrayToTabularTransformer());

        return pipeline;
    }
}

export default PipelineUtils;
