import type { Plugin, PostCssOptions } from '@docusaurus/types';

export default async function tailwindcss(): Promise<Plugin> {
    return {
        name: 'docusaurus-tailwindcss',
        injectHtmlTags() {
            return {
                headTags: [
                    {
                        tagName: 'link',
                        attributes: {
                            rel: 'stylesheet',
                            href: 'https://cdn.jsdelivr.net/npm/@tailwindcss/ui@latest/dist/tailwind-ui.min.css',
                        },
                    },
                    {
                        tagName: 'link',
                        attributes: {
                            rel: 'stylesheet',
                            href: 'https://rsms.me/inter/inter.css',
                        },
                    },
                ],
            };
        }
    };
}
