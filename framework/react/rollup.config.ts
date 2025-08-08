import { RollupOptions } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import tsConfigPaths from 'rollup-plugin-tsconfig-paths';
import nodeResolve from '@rollup/plugin-node-resolve';
import { dts } from 'rollup-plugin-dts';
import commonjs from '@rollup/plugin-commonjs';
import { createRequire } from 'module';

const pkg = createRequire(import.meta.url)('./package.json');
const isProduction = process.env.BUILD === 'production';
const globalName = 'paginatorjs';
const sourceFile = 'src/index.ts';

// JS config
const jsConfig: RollupOptions = {
    input: sourceFile,
    output: [
        {
            file: pkg.exports['.']['umd'],
            format: 'umd',
            name: globalName,
            globals: {
                'react': 'React',
                '@carry0987/paginator': globalName
            },
            plugins: isProduction ? [terser()] : []
        }
    ],
    external: ['react', '@carry0987/paginator'],
    plugins: [
        commonjs(),
        typescript(),
        tsConfigPaths(),
        nodeResolve()
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
    external: ['react', '@carry0987/paginator'],
    plugins: [
        commonjs(),
        typescript(),
        tsConfigPaths(),
        nodeResolve()
    ]
};

// DTS config
const dtsConfig: RollupOptions = {
    input: sourceFile,
    output: {
        file: pkg.exports['.']['types'],
        format: 'es'
    },
    external: ['react', '@carry0987/paginator'],
    plugins: [
        tsConfigPaths(),
        dts()
    ]
};

export default [jsConfig, esConfig, dtsConfig];
