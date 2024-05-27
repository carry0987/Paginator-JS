import { Status } from '../type/types';

export interface State {
    status: Status;
    data: Record<string, unknown> | null;
}
