import { PaginatorEvents, InternalEvents } from './events';
import { StorageResponse, ServerStorageOptions } from './storage';
import { State } from './state';
import Paginator from '@/component/paginator';
import { TData } from '@/type/types';
import { ProcessorType } from '@/type/processor';
import { StateManager } from '@/module/state/stateManager';
import Storage from '@/module/storage/storage';
import { EventEmitter } from '@carry0987/event-emitter';
import { Pipeline } from '@carry0987/pipeline';

export interface IConfig {
    instance: Paginator;
    state: StateManager<State>;
    eventEmitter: EventEmitter<PaginatorEvents & InternalEvents>;
    storage: Storage<any>;
    pipeline: Pipeline<StorageResponse | ServerStorageOptions, ProcessorType>;
    container?: Element;
    data?: TData | (() => TData) | (() => Promise<TData>);
    server?: ServerStorageOptions;
    position: string;
    resetPageOnUpdate?: boolean;
}
