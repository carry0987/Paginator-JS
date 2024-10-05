import Storage from './storage';
import { StorageResponse } from '@/interface/response';
import { TData } from '@/type/types';
import Utils from '@/module/utils/utils-ext';

class MemoryStorage extends Storage<TData> {
    private data: (() => TData) | (() => Promise<TData>) = (): TData => [];
    private readonly beforeDataLoad?: () => void;

    constructor(data: TData | (() => TData) | (() => Promise<TData>), beforeDataLoad?: () => void) {
        super();
        this.set(data);
        this.beforeDataLoad = beforeDataLoad;
    }

    public async get(): Promise<StorageResponse> {
        if (Utils.isFunction(this.beforeDataLoad)) {
            this.beforeDataLoad();
        }

        // Get the data
        const data = await this.data();

        return {
            data: data,
            total: data.length
        };
    }

    public set(data: TData | (() => TData) | (() => Promise<TData>)): this {
        if (data instanceof Array) {
            this.data = (): TData => data;
        } else if (data instanceof Function) {
            this.data = data;
        }

        return this;
    }
}

export default MemoryStorage;
