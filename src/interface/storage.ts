import { StorageResponse } from '@/interface/response';
import { Interfaces } from '@/module/utils/utils-ext';

type ServerStorageParam = Omit<Interfaces.FetchParams, 'url'>;

export interface ServerStorageOptions extends RequestInit {
    url: string;
    // To format the data and columns
    processData?: <T = any>(data: T) => T[][];
    // To handle the response from the server. `handle` will
    // be called first and then `then` callback will be invoked.
    // The purpose of this function is to handle the behaviour
    // of server and either reject and resolve the initial response
    // before calling the `then` function.
    handle?: <T = StorageResponse>(response: T) => Promise<T>;
    total?: <T = any>(data: T) => number;
    // To bypass the current implementation of ServerStorage and process the
    // request manually (e.g. when user wants to connect their own SDK/HTTP Client).
    data?: (opts: ServerStorageOptions) => Promise<StorageResponse>;
    param?: ServerStorageParam;
    // To handle the request detail for server-side pagination
    pageUrl?: (prevUrl: string, page: number, limit: number) => string;
    pageBody?: (prevBody: BodyInit, page: number, limit: number) => BodyInit;
}
