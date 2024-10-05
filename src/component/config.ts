import Header from './header';
import { Status } from '@/type/types';
import { Options } from '@/interface/options';
import { InternalConfig } from '@/interface/internalConfig';
import { State } from '@/interface/state';
import Utils from '@/module/utils/utils-ext';
import { StateManager } from '@/module/state/stateManager';
import StorageUtils from '@/module/storage/storageUtils';
import PipelineUtils from '@/module/pipeline/pipelineUtils';
import { Translator } from '@/module/i18n/translator';
import { createContext } from 'preact';

class Config {
    private internalConfig: InternalConfig = {} as InternalConfig;
    public options: Options = {} as Options;

    constructor() {
        this.assign(Config.defaultOption());
        this.assignInteral(Config.defaultConfig());
    }

    public assign(partialOption: Partial<Options>): this {
        Utils.shallowMerge(this.options, partialOption);

        return this;
    }

    public assignInteral(partialConfig: Partial<InternalConfig>): this {
        Utils.shallowMerge(this.internalConfig, partialConfig);

        return this;
    }

    public update(partialOption: Partial<Options>): this {
        if (!partialOption) return this;

        this.assign(
            Config.fromPartialOption({
                ...this.options,
                ...partialOption
            })
        );

        this.assignInteral(Config.fromPartialConfig(this));

        return this;
    }

    public get internal(): InternalConfig {
        return this.internalConfig;
    }

    private static defaultConfig(): Partial<InternalConfig> {
        return {
            state: new StateManager<State>({
                status: Status.Init,
                tabular: null
            })
        };
    }

    private static defaultOption(): Partial<Options> {
        return {
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
                autoHideNext: false
            },
            className: {
                container: '',
                active: 'active',
                disable: 'disabled',
                pageList: 'pages',
                pageButton: 'page-item',
                prevButton: 'page-prev',
                nextButton: 'page-next'
            }
        };
    }

    private static fromPartialConfig(config: Config) {
        config.assignInteral({
            header: Header.createFromConfig(config)
        });

        config.assignInteral({
            storage: StorageUtils.createFromConfig(config)
        });

        config.assignInteral({
            pipeline: PipelineUtils.createFromConfig(config)
        });

        config.assignInteral({
            translator: new Translator(config.options.language)
        });

        return config.internal;
    }

    private static fromPartialOption(partialOption: Partial<Options>) {
        const config = new Config().assign(partialOption);

        return config.options;
    }
}

const ConfigContext = createContext<Config | undefined>(undefined);

export { Config, ConfigContext };
