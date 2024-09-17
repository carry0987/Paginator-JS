import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import tsConfigPaths from 'rollup-plugin-tsconfig-paths';
import nodeResolve from '@rollup/plugin-node-resolve';
import { dts } from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import del from 'rollup-plugin-delete';
import { createRequire } from 'module';

const pkg = createRequire(import.meta.url)('./package.json');
const isProduction = process.env.BUILD === 'production';
const sourceFile = 'src/index.ts';
const l10nSourceFile = 'l10n/index.ts';

const jsConfig = {
    input: sourceFile,
    output: [
        {
            file: pkg.exports['.']['umd'],
            format: 'umd',
            name: 'paginatorjs',
            plugins: isProduction ? [terser()] : []
        }
    ],
    plugins: [
        postcss({
            extract: 'theme/paginator.min.css',
            minimize: true,
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

const esConfig = {
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

const dtsConfig = {
    input: sourceFile,
    output: {
        file: pkg.exports['.']['types'],
        format: 'es'
    },
    external: [/\.css$/u],
    plugins: [
        tsConfigPaths(),
        dts(),
        del({ hook: 'buildEnd', targets: 'dist/dts' })
    ]
};

const l10nConfig = {
    input: l10nSourceFile,
    output: [
        {
            file: pkg.exports['./l10n']['import'],
            format: 'es'
        },
        {
            file: pkg.exports['./l10n']['umd'],
            format: 'umd',
            name: 'paginatorjs.l10n'
        }
    ],
    plugins: [
        typescript({ tsconfig: 'l10n/tsconfig.json' }),
        tsConfigPaths({ tsConfigPath: 'l10n/tsconfig.json' }),
        nodeResolve(),
        ...(isProduction ? [terser()] : [])
    ]
};

const l10nDtsConfig = {
    input: l10nSourceFile,
    output: {
        file: pkg.exports['./l10n']['types'],
        format: 'es'
    },
    plugins: [
        tsConfigPaths({ tsConfigPath: 'l10n/tsconfig.json' }),
        dts({ tsconfig: 'l10n/tsconfig.json' }),
        del({ hook: 'buildEnd', targets: 'l10n/dist/dts' })
    ]
};

export default [jsConfig, esConfig, dtsConfig, l10nConfig, l10nDtsConfig];
