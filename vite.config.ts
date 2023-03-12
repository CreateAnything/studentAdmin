import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import {
	AntdResolve,
	createStyleImportPlugin,
} from 'vite-plugin-style-import';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		Components({
			resolvers: [AntDesignVueResolver()],
		}),
		//antd组件样式按需引入
		createStyleImportPlugin({
			resolves: [AntdResolve()],
		}),
		createSvgIconsPlugin({
			// 指定需要缓存的图标文件夹目录
			iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
			// 指定symbolId格式
			symbolId: 'icon-[dir]-[name]',
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
	},
	css: {
		preprocessorOptions: {
			less: {
				additionalData: `@import '@/assets/less/global.less';`,
				javascriptEnabled: true,
			},
		},
	},
});
