import { PipelineProcessor } from '../module/pipeline/processor';

export interface PipelineProcessorProps {}
export interface PipelineProcessorEvents {
    propsUpdated: <T, P extends Partial<PipelineProcessorProps>>(
        processor: PipelineProcessor<T, P>
    ) => void;
    beforeProcess: (...args: any[]) => void;
    afterProcess: (...args: any[]) => void;
}
