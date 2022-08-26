import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
        extensions: ['.js', '.ts', '.tsx'], // import引入文件的时候不用加后缀
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.js'),
            name: 'ApmHttpHandler',
            fileName: 'index',
        }
    },
    server: {
        host: '0.0.0.0',
        port: 9000
    }
});