import Header from './header';
import { Status } from '@/type/types';
import { Options } from '@/interface/options';
import { State } from '@/interface/state';
import Utils from '@/module/utils/utils-ext';
import { StateManager } from '@/module/state/stateManager';
import StorageUtils from '@/module/storage/storageUtils';
import PipelineUtils from '@/module/pipeline/pipelineUtils';
import { Translator } from '@/module/i18n/translator';
import { createContext } from 'preact';

class Config {
    public options: Options = {} as Options;

    constructor() {
        this.assign(Config.defaultConfig());
    }

    public assign(partialConfig: Partial<Options>): this {
        Utils.shallowMerge(this.options, partialConfig);

        return this;
    }

    public update(partialConfig: Partial<Options>): this {
        if (!partialConfig) return this;

        this.assign(
            Config.fromPartialConfig({
                ...this.options,
                ...partialConfig,
            }),
        );

        return this;
    }

    private static defaultConfig(): Partial<Options> {
        return {
            state: new StateManager<State>({
                status: Status.Init,
                tabular: null,
            }),
            position: 'bottom',
            resetPageOnUpdate: false,
            pageNumber: 1,
            pageSize: 10,
            pageRange: 2,
            display: {
                showPrevious: true,
                showNext: true,
                showPageNumbers: true,
                hideFirstOnEllipsisShow: false,
                hideLastOnEllipsisShow: false,
                autoHidePrevious: false,
                autoHideNext: false,
            },
            className: {
                container: '',
                active: 'active',
                disable: 'disabled',
                pageList: 'pages',
                pageButton: 'page-item',
                prevButton: 'page-prev',
                nextButton: 'page-next',
            },
        };
    }

    private static fromPartialConfig(partialConfig: Partial<Options>) {
        const config = new Config().assign(partialConfig);

        config.assign({
            header: Header.createFromConfig(config),
        });

        config.assign({
            storage: StorageUtils.createFromConfig(config),
        });

        config.assign({
            pipeline: PipelineUtils.createFromConfig(config),
        });

        config.assign({
            translator: new Translator(config.options.language),
        });

        return config.options;
    }
}

const ConfigContext = createContext<Config | undefined>(undefined);

export { Config, ConfigContext };
