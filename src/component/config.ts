import Header from './header';
import { Status } from '@/type/status';
import { Options } from '@/interface/options';
import { InternalConfig } from '@/interface/internalConfig';
import { State } from '@/interface/state';
import Utils from '@/module/utils/utils-ext';
import StorageUtils from '@/module/storage/storageUtils';
import PipelineUtils from '@/module/pipeline/pipelineUtils';
import { Translator } from '@/module/i18n/translator';
import PluginManager from '@/plugin/pluginManager';
import { StateManager } from '@carry0987/state-manager';
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
                tabular: null,
                header: null
            }),
            plugin: new PluginManager()
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
        // Header
        config.assignInteral({
            header: Header.createFromConfig(config)
        });

        // Storage
        config.assignInteral({
            storage: StorageUtils.createFromConfig(config)
        });

        // Pipeline
        config.assignInteral({
            pipeline: PipelineUtils.createFromConfig(config)
        });

        // Translator
        config.assignInteral({
            translator: new Translator(config.options.language)
        });

        // Clear existing plugins list to prevent duplicate errors
        config.internal.plugin = new PluginManager();

        // Additional plugins
        if (config.options.plugins) {
            config.options.plugins.forEach((p) => config.internal.plugin.add(p));
        }

        return config.internal;
    }

    private static fromPartialOption(partialOption: Partial<Options>) {
        const config = new Config().assign(partialOption);

        return config.options;
    }
}

const ConfigContext = createContext<Config | undefined>(undefined);

export { Config, ConfigContext };
