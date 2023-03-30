import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import {
	AndDesignVueResolve,
	createStyleImportPlugin,
} from 'vite-plugin-style-import';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
export default ({ mode }: ConfigEnv) => {
	const envConfig = loadEnv(mode, path.resolve(process.cwd(), './env'));
	const { VITE_PORT } = envConfig;
	return defineConfig({
		plugins: [
			vue(),
			Components({
				resolvers: [AntDesignVueResolver()],
			}),
			//antd组件样式按需引入
			createStyleImportPlugin({
				resolves: [AndDesignVueResolve()],
			}),
			createSvgIconsPlugin({
				// 指定需要缓存的图标文件夹目录
				iconDirs: [
					path.resolve(process.cwd(), 'src/assets/icons'),
				],
				// 指定symbolId格式
				symbolId: 'icon-[dir]-[name]',
			}),
		],
		//加载本地的env环境配置
		envDir: path.resolve(process.cwd(), './env'),
		//配置跨域代理
		server: {
			port: parseInt(VITE_PORT),
			hmr: false,
			proxy: {
				'/api': {
					target: 'http://localhost:8080',
					secure: false,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
		},
		resolve: {
			//设置别名
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
			//导入时需要省略的扩展名
			extensions: ['.mjs', '.js', '.ts', '.json'],
		},
		css: {
			preprocessorOptions: {
				less: {
					additionalData: `@import '@/assets/less/global.less';`,
					javascriptEnabled: true,
				},
			},
		},
		build: {
			cssCodeSplit: false,
		},
	});
};
