import { TData } from '../type/types';

export interface ServerStorageOptions extends RequestInit {
    url: string;
    // to format the data and columns
    then?: (data: any) => any[][];
    // to handle the response from the server. `handle` will
    // be called first and then `then` callback will be invoked
    // The purpose of this function is to handle the behaviour
    // of server and either reject and resolve the initial response
    // before calling the `then` function
    handle?: (response: StorageResponse) => Promise<any>;
    total?: (data: any) => number;
    // to bypass the current implementation of ServerStorage and process the
    // request manually (e.g. when user wants to connect their own SDK/HTTP Client)
    data?: (opts: ServerStorageOptions) => Promise<StorageResponse>;
}

export interface StorageResponse {
    data: TData;
    total: number;
}
