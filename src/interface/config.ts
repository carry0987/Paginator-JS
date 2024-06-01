import Paginator from '../component/paginator';
import { TData } from '../type/types';
import { PaginatorEvents, InternalEvents } from './events';
import { ServerStorageOptions } from './storage';
import { State } from './state';
import { EventEmitter } from '@carry0987/event-emitter';
import { Pipeline } from '@carry0987/pipeline';
import { StateManager } from '../module/state/stateManager';
import Storage from '../module/storage/storage';

export interface IConfig {
    instance: Paginator;
    store: StateManager<State>;
    eventEmitter: EventEmitter<PaginatorEvents & InternalEvents>;
    storage: Storage<any>;
    pipeline: Pipeline<any, any>;
    container?: Element;
    data?: TData | (() => TData) | (() => Promise<TData>);
    server?: ServerStorageOptions;
    position: string;
    resetPageOnUpdate?: boolean;
}
