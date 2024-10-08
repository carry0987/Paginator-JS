import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
    - create an ordered group of docs
    - render a sidebar for each doc of that group
    - provide next/previous navigation

    The sidebars can be generated from the filesystem, or explicitly defined here.

    Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
    docs: [
        {
            type: 'category',
            label: '👋 Introduction',
            link: {
                type: 'generated-index',
            },
            collapsed: false,
            items: ['index', 'philosophy', 'community'],
        },
        {
            type: 'category',
            label: '💁 Usage',
            items: ['install', 'hello-world', 'config', 'server-side'],
        },
        {
            type: 'category',
            label: '🛠 Config',
            items: [
                'config/data',
                'config/pageNumber',
                'config/pageSize',
                'config/pageRange',
                'config/beforeDataLoad',
                'config/dataRender',
                'config/display',
                'config/columns',
                'config/server',
                'config/className',
                'config/language',
                'config/resetPageOnUpdate',
            ],
        },
        {
            type: 'category',
            label: '🧩 Plugins',
            items: [
                {
                    type: 'category',
                    label: 'Overview',
                    items: [
                        'plugins/basic',
                        'plugins/writing-plugin',
                        'plugins/advanced-plugin',
                    ],
                },
            ],
        },
        {
            type: 'category',
            label: '🌎 Localization',
            items: ['localization/locales'],
        },
        {
            type: 'category',
            label: '🎮 Examples',
            items: [
                {
                    type: 'category',
                    label: 'Basic',
                    items: ['examples/hello-world', 'examples/pagination'],
                },
                {
                    type: 'category',
                    label: 'Data Source',
                    items: [
                        'examples/import-json',
                        'examples/server',
                        'examples/import-function',
                        'examples/import-async',
                    ],
                },
                {
                    type: 'category',
                    label: 'Server-side',
                    items: [
                        'examples/server',
                        'examples/server-side-pagination',
                        'examples/custom-http-client',
                    ],
                },
                {
                    type: 'category',
                    label: 'Styling',
                    items: [
                        'examples/css-style',
                        'examples/css-classname',
                        'examples/css-in-js',
                    ],
                },
                {
                    type: 'category',
                    label: 'Customizing',
                    items: ['examples/cell-formatting', 'examples/html-cells'],
                },
                {
                    type: 'category',
                    label: 'Advanced',
                    items: ['examples/force-render', 'examples/event-handler'],
                },
            ],
        },
    ],
};

export default sidebars;
