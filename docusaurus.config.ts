import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
    title: 'Paginator.js',
    tagline: 'Advanced Pagination Plugin',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://carry0987.github.io',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/Paginator-JS/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'carry0987', // Usually your GitHub org/user name.
    projectName: 'Paginator-JS', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            '@docusaurus/preset-classic',
            {
                sitemap: {
                    changefreq: 'weekly',
                    priority: 0.5,
                },
                docs: {
                    sidebarPath: './sidebars.ts',
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/carry0987/Paginator-JS/tree/gh-pages/',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        navbar: {
            hideOnScroll: true,
            title: 'Paginator-JS',
            items: [
                {
                    to: 'docs',
                    activeBasePath: 'docs',
                    position: 'left',
                    label: 'Document',
                },
                {
                    to: 'docs/examples/hello-world',
                    activeBasePath: 'docs/examples',
                    label: 'Examples',
                    position: 'left',
                },
                {
                    href: 'https://www.npmjs.com/package/@carry0987/paginator',
                    label: 'NPM',
                    position: 'right',
                },
                {
                    href: 'https://github.com/carry0987/Paginator-JS',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            copyright: `Copyright © ${new Date().getFullYear()} carry0987. Built with Docusaurus.`,
        },
        colorMode: {
            defaultMode: 'light',
            disableSwitch: false,
            respectPrefersColorScheme: true,
        },
        prism: {
            theme: prismThemes.oneDark,
            darkTheme: prismThemes.oneDark,
            additionalLanguages: ['tsx', 'css', 'json', 'bash'],
        },
        liveCodeBlock: {
            /**
             * The position of the live playground, above or under the editor
             * Possible values: "top" | "bottom"
             */
            playgroundPosition: 'bottom',
        },
        algolia: {
            appId: 'PNL7BHFF9Y',
            apiKey: '416d5443af29051407b696c9eaa6a825',
            indexName: 'carry0987io',
            contextualSearch: true,
            externalUrlRegex: 'external\\.com|domain\\.com',
            searchParameters: {},
            searchPagePath: 'search',
            insights: false,
        },
    } satisfies Preset.ThemeConfig,
    themes: ['@docusaurus/theme-live-codeblock'],
    plugins: ['./plugins/tailwindcss/index.ts'],
};

export default config;
