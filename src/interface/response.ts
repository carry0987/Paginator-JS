import { TCell, TwoDArray, TData } from '@/type/types';

export interface ArrayResponse {
    data: TwoDArray<TCell>;
    total: number;
}

export interface StorageResponse {
    data: TData;
    total: number;
}
