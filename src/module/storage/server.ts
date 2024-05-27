import Storage from './storage';
import { ServerStorageOptions, StorageResponse } from '../../interface/storage';
import log from '../utils/log';
import { fetchData } from '@carry0987/utils';

class ServerStorage extends Storage<ServerStorageOptions> {
    private readonly options: ServerStorageOptions;

    constructor(options: ServerStorageOptions) {
        super();
        this.options = options;
    }

    private handler(response: Response): Promise<any> {
        if (typeof this.options.handle === 'function') {
            return this.options.handle(response);
        }

        if (response.ok) {
            return response.json();
        } else {
            log.error(
                `Could not fetch data: ${response.status} - ${response.statusText}`,
                true
            );
        }

        return Promise.reject(response);
    }

    public get(options?: ServerStorageOptions): Promise<StorageResponse> {
        // this.options is the initial config object
        // options is the runtime config passed by the pipeline (e.g. search component)
        const opts = {
            ...this.options,
            ...options,
        };

        // if `options.data` is provided, the current ServerStorage
        // implementation will be ignored and we let options.data to
        // handle the request. Useful when HTTP client needs to be
        // replaced with something else
        if (typeof opts.data === 'function') {
            return opts.data(opts);
        }

        return fetchData<StorageResponse>({
            url: opts.url,
            data: opts,
        })
            .then(this.handler.bind(this))
            .then((res) => {
                return {
                    data: opts.then(res),
                    total:
                        typeof opts.total === 'function'
                            ? opts.total(res)
                            : undefined,
                };
            });
    }
}

export default ServerStorage;
