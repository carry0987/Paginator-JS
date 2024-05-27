import { Status } from '../type/types';
import { Options } from '../interface/interfaces';
import { State } from '../interface/state';
import { createContext } from 'preact';
import Utils from '../module/utils/utils-ext';
import { StateManager } from '../module/state/stateManager';
import Storage from '../module/storage/storage';
import StorageUtils from '../module/storage/storageUtils';

const defaults: Partial<Options> = {
    store: new StateManager<State>({
        status: Status.Init,
        data: null,
    }),
    position: 'bottom',
    resetPageOnUpdate: false,
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
    display: {
        showPrevious: true,
        showNext: true,
        showPageNumbers: true,
        showNavigator: false,
        hideFirstOnEllipsisShow: false,
        hideLastOnEllipsisShow: false,
        autoHidePrevious: false,
        autoHideNext: false
    },
    className: {
        container: '',
        prefix: 'pagination',
        active: 'active',
        disable: 'disabled',
        ul: 'pagination',
        pageButton: 'page-item',
        prevButton: 'page-item',
        nextButton: 'page-item',
        loading: 'loading',
        notfound: 'notfound',
        error: 'error'
    },
    customize: {
        prevText: '&laquo;',
        nextText: '&raquo;',
        ellipsisText: '...',
        formatNavigator: '{currentPage} of {totalPage}',
        pageLink: ''
    },
    utilities: {
        formatResult: (data: any) => data,
        triggerPagingOnInit: true,
        resetPageNumberOnInit: false,
        hideOnlyOnePage: false,
        onError: (err: unknown) => console.error('Pagination error:', err)
    }
};

const ConfigContext = createContext<Options | undefined>(undefined);

class Config {
    public options: Options = {} as Options;

    constructor() {
        Utils.deepMerge(this.options, defaults);
    }

    public assign(partialConfig: Partial<Options>): this {
        Utils.deepMerge(this.options, partialConfig);

        return this;
    }

    public update(partialConfig: Partial<Options>): this {
        if (!partialConfig) return this;

        this.assign(Config.fromPartialConfig(partialConfig));

        return this;
    }

    private static fromPartialConfig(partialConfig: Partial<Options>) {
        const config = new Config().assign(partialConfig);

        config.assign({
            storage: StorageUtils.createFromConfig(config),
        });

        return config.options;
    }
}

export { Config, ConfigContext };
