// The order of enum items define the processing order of the processor type
// e.g. Extractor = 0 will be processed before Transformer = 1
import { generateUUID, ID } from '../utils/id';
import { EventEmitter } from '@carry0987/event-emitter';
import { deepEqual } from '../utils/deepEqual';
import { ProcessorType } from '../../type/pipeline';
import { PipelineProcessorEvents, PipelineProcessorProps } from '../../interface/pipeline';

export abstract class PipelineProcessor<
    T,
    P extends Partial<PipelineProcessorProps>
> extends EventEmitter<PipelineProcessorEvents> {
    public readonly id: ID;
    private _props: P;

    abstract get type(): ProcessorType;
    protected abstract _process(...args: any[]): T | Promise<T>;
    protected validateProps?(...args: any[]): void;

    constructor(props?: Partial<P>) {
        super();

        this._props = {} as P;
        this.id = generateUUID();

        if (props) this.setProps(props);
    }

    /**
     * process is used to call beforeProcess and afterProcess callbacks
     * This function is just a wrapper that calls _process()
     *
     * @param args
     */
    public process(...args: any[]): T | Promise<T> {
        if (this.validateProps instanceof Function) {
            this.validateProps(...args);
        }

        this.emit('beforeProcess', ...args);
        const result = this._process(...args);
        this.emit('afterProcess', ...args);

        return result;
    }

    public setProps(props: Partial<P>): this {
        const updatedProps = {
            ...this._props,
            ...props,
        };

        if (!deepEqual(updatedProps, this._props)) {
            this._props = updatedProps;
            this.emit('propsUpdated', this);
        }

        return this;
    }

    public get props(): P {
        return this._props;
    }
}
