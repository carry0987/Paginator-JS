import Tabular from '@/component/tabular';
import Header from '@/component/header';
import { Status } from '@/type/status';

export interface State {
    status: Status;
    tabular: Tabular | null;
    header: Header | null;
    [key: string]: any;
}
