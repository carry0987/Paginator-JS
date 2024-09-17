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
            items: [
                'index',
                'philosophy',
                'community',
            ],
        },
        {
            type: 'category',
            label: '💁 Usage',
            collapsed: false,
            items: [
                'install',
                'hello-world',
                'config',
                'server-side',
            ],
        },
        {
            type: 'category',
            label: '🛠 Config',
            collapsed: false,
            items: [
                'config/data',
                'config/columns',
                'config/server',
                'config/className',
                'config/language',
                'config/pagination',
            ],
        },
        {
            type: 'category',
            label: '🌎 Localization',
            collapsed: false,
            items: [
                'localization/locales',
            ],
        },
        {
            type: 'category',
            label: '🎮 Examples',
            collapsed: false,
            items: [
                'examples/hello-world',
                'examples/pagination',
                'examples/fixed-header',
            ],
        }
    ]
};

export default sidebars;
