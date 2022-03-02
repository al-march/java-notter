import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from 'path';

export default defineConfig({
    plugins: [solidPlugin()],
    build: {
        target: 'esnext',
        polyfillDynamicImport: false,
    },
    resolve: {
        alias: {
            '@root': __dirname,
            '@components': path.resolve(__dirname, 'src', 'lib', 'components')
        }
    }
});
