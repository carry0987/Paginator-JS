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
            label: '🌎 Localization',
            collapsed: false,
            items: [
                'localization/locales',
            ],
        }
    ]
};

export default sidebars;
