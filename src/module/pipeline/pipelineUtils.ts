import StorageExtractor from './extractor/storage';
import ServerInitiator from './initiator/server';
import StorageResponseToArrayTransformer from './transformer/storageResponseToArray';
import ArrayToTabularTransformer from './transformer/arrayToTabular';
import { Config } from '@/component/config';
import ServerStorage from '@/module/storage/server';
import { ProcessorType } from '@/type/processor';
import { Pipeline } from '@carry0987/pipeline';

class PipelineUtils {
    static createFromConfig(config: Config): Pipeline<any, ProcessorType> {
        const pipeline = new Pipeline<any, ProcessorType>();

        if (config.internal.storage instanceof ServerStorage) {
            pipeline.register(
                new ServerInitiator({
                    serverStorageOptions: config.options.server,
                }),
            );
        }

        pipeline.register(new StorageExtractor({ storage: config.internal.storage }));
        pipeline.register(new StorageResponseToArrayTransformer({ header: config.internal.header }));
        pipeline.register(new ArrayToTabularTransformer());

        return pipeline;
    }
}

export default PipelineUtils;
