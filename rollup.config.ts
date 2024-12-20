import { RollupOptions } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import tsConfigPaths from 'rollup-plugin-tsconfig-paths';
import nodeResolve from '@rollup/plugin-node-resolve';
import { dts } from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';

const pkg = createRequire(import.meta.url)('./package.json');
const isProduction = process.env.BUILD === 'production';
const globalName = 'paginatorjs';
const sourceFile = 'src/index.ts';
const l10nSourceFile = 'l10n/index.ts';

function createPluginConfig(pluginName: string): RollupOptions[] {
    const inputPath = `plugins/${pluginName}/index.ts`;
    const tsconfigPath = `plugins/${pluginName}/tsconfig.json`;

    return [
        // JS/UMD config
        {
            input: inputPath,
            output: [
                {
                    file: `plugins/${pluginName}/dist/${pluginName}.min.js`,
                    format: 'umd',
                    name: `${globalName}.plugins.${pluginName}`,
                    globals: {
                        '@carry0987/paginator': globalName
                    },
                    plugins: isProduction ? [terser()] : []
                }
            ],
            external: ['@carry0987/paginator'],
            plugins: [
                postcss({ inject: true, minimize: isProduction }),
                typescript({ tsconfig: tsconfigPath }),
                tsConfigPaths({ tsConfigPath: tsconfigPath }),
                nodeResolve(),
                replace({
                    preventAssignment: true,
                    __version__: pkg.version
                })
            ]
        },
        // ES Module config
        {
            input: inputPath,
            output: {
                file: `plugins/${pluginName}/dist/${pluginName}.esm.js`,
                format: 'es',
                globals: {
                    '@carry0987/paginator': globalName
                }
            },
            external: ['@carry0987/paginator'],
            plugins: [
                postcss({ inject: true, minimize: isProduction }),
                typescript({ tsconfig: tsconfigPath }),
                tsConfigPaths({ tsConfigPath: tsconfigPath }),
                nodeResolve(),
                replace({
                    preventAssignment: true,
                    __version__: pkg.version
                })
            ]
        },
        // DTS config
        {
            input: inputPath,
            output: {
                file: `plugins/${pluginName}/dist/index.d.ts`,
                format: 'es',
                globals: {
                    '@carry0987/paginator': globalName
                }
            },
            external: [/\.scss$/u],
            plugins: [
                tsConfigPaths({ tsConfigPath: tsconfigPath }),
                dts()
            ]
        }
    ];
}

// JS config
const jsConfig: RollupOptions = {
    input: sourceFile,
    output: [
        {
            file: pkg.exports['.']['umd'],
            format: 'umd',
            name: globalName,
            plugins: isProduction ? [terser()] : []
        }
    ],
    plugins: [
        postcss({
            extract: path.resolve(pkg.exports['./theme/paginator.min.css']),
            minimize: isProduction,
            sourceMap: false
        }),
        typescript(),
        tsConfigPaths(),
        nodeResolve(),
        replace({
            preventAssignment: true,
            __version__: pkg.version
        })
    ]
};

// ES Module config
const esConfig: RollupOptions = {
    input: sourceFile,
    output: [
        {
            file: pkg.exports['.']['import'],
            format: 'es'
        }
    ],
    plugins: [
        postcss({
            inject: false,
            extract: false,
            sourceMap: false
        }),
        typescript(),
        tsConfigPaths(),
        nodeResolve(),
        replace({
            preventAssignment: true,
            __version__: pkg.version
        })
    ]
};

// DTS config
const dtsConfig: RollupOptions = {
    input: sourceFile,
    output: {
        file: pkg.exports['.']['types'],
        format: 'es'
    },
    external: [/\.scss$/u],
    plugins: [
        tsConfigPaths(),
        dts()
    ]
};

// I10n config
const l10nConfig: RollupOptions = {
    input: l10nSourceFile,
    output: [
        {
            file: pkg.exports['./l10n']['import'],
            format: 'es'
        },
        {
            file: pkg.exports['./l10n']['umd'],
            format: 'umd',
            name: `${globalName}.l10n`
        }
    ],
    plugins: [
        typescript({ tsconfig: 'l10n/tsconfig.json' }),
        tsConfigPaths({ tsConfigPath: 'l10n/tsconfig.json' }),
        nodeResolve(),
        ...(isProduction ? [terser()] : [])
    ]
};

// DTS config for l10n
const l10nDtsConfig: RollupOptions = {
    input: l10nSourceFile,
    output: {
        file: pkg.exports['./l10n']['types'],
        format: 'es'
    },
    plugins: [
        tsConfigPaths({ tsConfigPath: 'l10n/tsconfig.json' }),
        dts({ tsconfig: 'l10n/tsconfig.json' })
    ]
};

// Automatically discover plugin directories and generate configs
const pluginDirectories = fs.readdirSync('plugins').filter(dir => {
    return fs.statSync(`plugins/${dir}`).isDirectory();
});
const pluginConfigs = pluginDirectories.flatMap(createPluginConfig);

export default [jsConfig, esConfig, dtsConfig, l10nConfig, l10nDtsConfig, ...pluginConfigs];
