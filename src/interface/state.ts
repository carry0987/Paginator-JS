import Tabular from '@/component/tabular';
import { Status } from '@/type/status';

export interface State {
    status: Status;
    tabular: Tabular | null;
    [key: string]: any;
}
