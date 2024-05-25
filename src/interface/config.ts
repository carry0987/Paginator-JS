import Paginator from '../component/paginator';
import { TData } from '../type/types';
import { PaginatorEvents, InternalEvents } from './events';
import { ServerStorageOptions } from './storage';
import { EventEmitter } from '@carry0987/event-emitter';
import { Store } from '../module/state/stateManager';

export interface IConfig {
    instance: Paginator;
    store: Store;
    eventEmitter: EventEmitter<PaginatorEvents & InternalEvents>;
    container?: Element;
    data?: TData | (() => TData) | (() => Promise<TData>);
    server?: ServerStorageOptions;
}
