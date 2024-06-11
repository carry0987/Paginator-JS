import { StorageResponse } from './storage';
import { Status } from '@/type/types';

export interface State {
    status: Status;
    data: StorageResponse | null;
}
