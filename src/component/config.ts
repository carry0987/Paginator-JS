import { Status } from '../type/types';
import { Options } from '../interface/interfaces';
import { createContext } from 'preact';
import Utils from '../module/utils/utils-ext';
import { StateManager } from '../module/state/stateManager';

const defaults: Partial<Options> = {
    store: new StateManager({
        status: Status.Init,
        data: null,
    } as Partial<StateManager>),
    dataSource: [],
    locator: 'data',
    totalNumber: 0,
    totalNumberLocator: null,
    pageNumber: 1,
    pageSize: 10,
    pageRange: 2,
    alias: {
        pageNumber: 'pageNumber',
        pageSize: 'pageSize',
    },
    showPrevious: true,
    showNext: true,
    showPageNumbers: true,
    showNavigator: false,
    hideFirstOnEllipsisShow: false,
    hideLastOnEllipsisShow: false,
    autoHidePrevious: false,
    autoHideNext: false,
    classPrefix: 'pagination',
    className: '',
    activeClassName: 'active',
    disableClassName: 'disabled',
    ulClassName: '',
    pageClassName: '',
    prevClassName: '',
    nextClassName: '',
    prevText: '&laquo;',
    nextText: '&raquo;',
    ellipsisText: '...',
    goButtonText: 'Go',
    formatNavigator: '{currentPage} of {totalPage}',
    header: '',
    footer: '',
    pageLink: '',
    position: 'bottom',
    formatResult: (data: any) => data,
    dataLoader: {
        method: 'GET',
        data: {},
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        beforeSend: (pagination: any) => pagination,
        credentials: 'same-origin',
        pageNumberStartWithZero: false
    },
    triggerPagingOnInit: true,
    resetPageNumberOnInit: false,
    hideOnlyOnePage: false,
    onError: (err: unknown) => console.error('Pagination error:', err)
};

const ConfigContext = createContext<Options | undefined>(undefined);

class Config {
    public options: Options = {} as Options;

    constructor() {
        this.options = Utils.deepMerge({} as Options, defaults, this.options);
    }

    public assign(partialConfig: Partial<Options>): this {
        this.options = Utils.deepMerge(this.options, partialConfig);

        return this;
    }

    public update(partialConfig: Partial<Options>): this {
        if (!partialConfig) return this;

        Utils.deepMerge(this.options, partialConfig);

        return this;
    }
}

export { Config, ConfigContext };
