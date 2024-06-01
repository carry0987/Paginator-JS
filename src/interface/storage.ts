import { TData } from '../type/types';
import { Interfaces } from '@carry0987/utils';

export interface StorageResponse {
    data: TData;
    total: number;
}

export interface ServerStorageOptions extends RequestInit {
    url: string;
    // to format the data and columns
    processData?: <T = any>(data: T) => T[][];
    // to handle the response from the server. `handle` will
    // be called first and then `then` callback will be invoked
    // The purpose of this function is to handle the behaviour
    // of server and either reject and resolve the initial response
    // before calling the `then` function
    handle?: <T = StorageResponse>(response: T) => Promise<T>;
    total?: <T = any>(data: T) => number;
    // to bypass the current implementation of ServerStorage and process the
    // request manually (e.g. when user wants to connect their own SDK/HTTP Client)
    data?: (opts: ServerStorageOptions) => Promise<StorageResponse>;
    param?: Interfaces.FetchParams;
}
