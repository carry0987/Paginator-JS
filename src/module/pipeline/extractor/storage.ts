import Storage from '@/module/storage/storage';
import { StorageResponse } from '@/interface/response';
import { ServerStorageOptions } from '@/interface/storage';
import { ProcessorType } from '@/type/processor';
import { Processor, ProcessorProps } from '@carry0987/pipeline';

interface StorageExtractorProps extends ProcessorProps {
    storage: Storage<any>;
}

class StorageExtractor extends Processor<StorageResponse, ProcessorType, StorageExtractorProps> {
    public get type(): ProcessorType {
        return ProcessorType.Extractor;
    }

    protected async _process(opts?: Partial<ServerStorageOptions>): Promise<StorageResponse> {
        return await this.props.storage.get(opts);
    }
}

export default StorageExtractor;
