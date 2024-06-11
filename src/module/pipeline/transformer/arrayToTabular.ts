import { ArrayResponse } from './storageResponseToArray';
import { ProcessorType } from '@/type/processor';
import Tabular from '@/component/tabular';
import { Processor } from '@carry0987/pipeline';

class ArrayToTabularTransformer extends Processor<Tabular, ProcessorType, Record<string, any>> {
    public get type(): ProcessorType {
        return ProcessorType.Transformer;
    }

    protected async _process(arrayResponse: ArrayResponse): Promise<Tabular> {
        const tabular = Tabular.fromArray(arrayResponse.data);

        // for server-side storage
        tabular.length = arrayResponse.total;

        return tabular;
    }
}

export default ArrayToTabularTransformer;
