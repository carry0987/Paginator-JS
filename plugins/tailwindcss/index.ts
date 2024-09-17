import type { Plugin, PostCssOptions } from '@docusaurus/types';

export default async function tailwindcss(): Promise<Plugin> {
    return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions: PostCssOptions) {
            // Appends TailwindCSS and AutoPrefixer.
            postcssOptions.plugins.push(require('tailwindcss'));
            postcssOptions.plugins.push(require('autoprefixer'));
            return postcssOptions;
        },
    };
}
