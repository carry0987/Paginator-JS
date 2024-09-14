import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    test: {
        environment: 'node',
        typecheck: {
            tsconfig: 'tsconfig.json',
        },
        coverage: {
            // Test coverage options (optional)
            reporter: ['text', 'json', 'html'],
        }
    },
});
