import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import { AntdResolve, createStyleImportPlugin } from 'vite-plugin-style-import';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //vite编译可以提示eslint错误
    eslintPlugin({
      cache: false,
    }),
    //antd组件按需引入
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    //antd组件样式按需引入
    createStyleImportPlugin({
      resolves: [AntdResolve()],
    }),
  ],
  resolve: {
    //设置别名
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    //导入时需要省略的扩展名
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  server: {
    port: 3000,
    open: true,
    hmr: true,
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import '@/assets/less/global.less';`,
      },
    },
  },
});
