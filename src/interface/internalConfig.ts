import { ServerStorageOptions } from './storage';
import { State } from './state';
import Paginator from '@/component/paginator';
import Tabular from '@/component/tabular';
import Header from '@/component/header';
import { PaginatorEvents } from '@/type/events';
import { TData, OneDArray } from '@/type/types';
import { ProcessorType } from '@/type/processor';
import { Language } from '@/type/i18n';
import { TColumn } from '@/interface/column';
import { StateManager } from '@/module/state/stateManager';
import Storage from '@/module/storage/storage';
import { Translator } from '@/module/i18n/translator';
import { EventEmitter } from '@carry0987/event-emitter';
import { Pipeline } from '@carry0987/pipeline';
import { ComponentChild } from 'preact';

export interface InternalConfig {
    instance: Paginator;
    state: StateManager<State>;
    eventEmitter: EventEmitter<PaginatorEvents>;
    storage: Storage<any>;
    pipeline: Pipeline<Tabular | ServerStorageOptions, ProcessorType>;
    container?: Element;
    data?: TData | (() => TData) | (() => Promise<TData>);
    header?: Header;
    columns: OneDArray<TColumn | string | ComponentChild>;
    server?: ServerStorageOptions;
    language: Language;
    translator: Translator;
}
