import { ServerStorageOptions } from './storage';
import { State } from './state';
import Paginator from '@/component/paginator';
import Tabular from '@/component/tabular';
import Header from '@/component/header';
import { PaginatorEvents } from '@/type/events';
import { ProcessorType } from '@/type/processor';
import Storage from '@/module/storage/storage';
import { Translator } from '@/module/i18n/translator';
import PluginManager from '@/plugin/pluginManager';
import { StateManager } from '@carry0987/state-manager';
import { EventEmitter } from '@carry0987/event-emitter';
import { Pipeline } from '@carry0987/pipeline';

export interface InternalConfig {
    instance: Paginator;
    state: StateManager<State>;
    eventEmitter: EventEmitter<PaginatorEvents>;
    storage: Storage<any>;
    pipeline: Pipeline<Tabular | ServerStorageOptions, ProcessorType>;
    header?: Header;
    translator: Translator;
    plugin: PluginManager;
}
