import StorageExtractor from './extractor/storage';
import ServerInitiator from './initiator/server';
import StorageResponseToArrayTransformer from './transformer/storageResponseToArray';
import { Config } from '@/component/config';
import ServerStorage from '@/module/storage/server';
import { ProcessorType } from '@/type/processor';
import { Pipeline } from '@carry0987/pipeline';

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

        pipeline.register(new StorageExtractor({ storage: config.options.storage }));
        pipeline.register(new StorageResponseToArrayTransformer());

        return pipeline;
    }
}

export default PipelineUtils;
