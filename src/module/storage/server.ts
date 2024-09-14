import Storage from './storage';
import { ServerStorageOptions } from '@/interface/storage';
import { StorageResponse } from '@/interface/response';
import Utils, { Interfaces } from '@/module/utils/utils-ext';
import log from '@/module/utils/log';

class ServerStorage extends Storage<ServerStorageOptions> {
    private readonly options: ServerStorageOptions;
    private readonly beforeDataLoad?: () => void;

    constructor(options: ServerStorageOptions, beforeDataLoad?: () => void) {
        super();
        this.options = options;
        this.beforeDataLoad = beforeDataLoad;
    }

    private handler<T = ServerStorage>(response: T): Promise<T> {
        if (typeof this.options.handle === 'function') {
            return this.options.handle<T>(response);
        }

        return Promise.resolve(response);
    }

    public async get(options?: Partial<ServerStorageOptions>): Promise<StorageResponse> {
        // `this.options` is the initial config object
        // `options` is the runtime config passed by the pipeline (e.g. search component)
        const opts = {
            ...this.options,
            ...options,
        };
        const fetchParam: Interfaces.SendFormDataOptions<StorageResponse> = {
            url: opts.url,
            data: Utils.encodeFormData(opts.body || {}),
            ...opts.param,
        };

        // If `options.data` is provided, the current ServerStorage
        // implementation will be ignored and we let options.data to
        // handle the request. Useful when HTTP client needs to be
        // replaced with something else
        if (Utils.isFunction(opts.data)) {
            return opts.data(opts);
        }

        // If `options.param.beforeSend` is not a function and `this.beforeDataLoad` is a function
        if (!Utils.isFunction(opts.param?.beforeSend) && Utils.isFunction(this.beforeDataLoad)) {
            fetchParam.beforeSend = this.beforeDataLoad;
        }

        return await Utils.fetchData(fetchParam).then(this.handler.bind(this))
            .then((res) => {
                return {
                    data: opts.processData ? opts.processData(res) : [],
                    total: typeof opts.total === 'function' ? opts.total(res) : 0
                };
            })
            .catch((error) => {
                log.error(`Error in get method: ${error.message}`, true);
                return Promise.reject(error);
            });
    }
}

export default ServerStorage;
