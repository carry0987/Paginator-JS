import Storage from '../../storage/storage';
import { StorageResponse } from '../../../interface/storage';
import { PipelineProcessor } from '../processor';
import { ProcessorType } from '../../../type/pipeline';
import { PipelineProcessorProps } from '../../../interface/pipeline';

interface StorageExtractorProps extends PipelineProcessorProps {
    storage: Storage<any>;
}

class StorageExtractor extends PipelineProcessor<
    StorageResponse,
    StorageExtractorProps
> {
    get type(): ProcessorType {
        return ProcessorType.Extractor;
    }

    async _process(opts: any): Promise<StorageResponse> {
        return await this.props.storage.get(opts);
    }
}

export default StorageExtractor;
