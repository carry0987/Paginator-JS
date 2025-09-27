import { defineConfig, coverageConfigDefaults } from 'vitest/config';
import path from 'path';

export default defineConfig({
    test: {
        projects: [
            {
                resolve: {
                    alias: {
                        '@': path.resolve(__dirname, 'src')
                    }
                },
                test: {
                    root: './test',
                    name: { label: 'core', color: 'green' },
                    environment: 'happy-dom'
                }
            },
            {
                resolve: {
                    alias: {
                        '@': path.resolve(__dirname, 'framework/react/src')
                    }
                },
                test: {
                    root: './framework/react',
                    name: { label: 'react', color: 'blue' },
                    environment: 'happy-dom'
                }
            },
            {
                resolve: {
                    alias: {
                        '@': path.resolve(__dirname, 'src')
                    }
                },
                test: {
                    root: './plugins',
                    name: { label: 'plugins', color: 'yellow' },
                    environment: 'happy-dom'
                }
            }
        ],
        coverage: {
            // Test coverage options
            enabled: true,
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [...coverageConfigDefaults.exclude, 'src/module/view/**', '**/dist/**', 'l10n/**']
        },
        typecheck: {
            // Type check options (optional)
            enabled: true
        }
    }
});
