import Tabular from '@/component/tabular';
import { Status } from '@/type/types';

export interface State {
    status: Status;
    tabular: Tabular | null;
}
