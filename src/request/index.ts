import router from '@/router/index';
import { createMessage } from '@/utils';
import Request from './request';
import { RequestConfig, SuccessStatus } from './type';
import { ReloadConnect, switchMessages } from './utils';
const message = createMessage();
export const MyRequest = new Request({
	baseURL: `http://localhost:${import.meta.env.VITE_PORT}/api/`,
	timeout: import.meta.env.VITE_TIMEOUT,
	retry: 3, //设置重连次数
	retryDelay: 3000, //重连延迟时间

	interceptors: {
		requestInterceptors: (config) => {
			return config;
		},
		responseInterceptors: (response) => {
			if (response.data.code !== SuccessStatus.SUCCESS) {
				message.warning(response.data.msg);
			}
			switchMessages(response.config.method);
			return response.data.page;
		},
		responseInterceptorCatch(err) {
			const config = err.config as RequestConfig;
			const status = err.response?.status;

			//如果没用配置重连选项,直接返回错误
			if (!config.retry || status !== 500) {
				switch (status) {
					case 404 || 405:
						message.error('未知的链接接口');
						break;
				}
				return Promise.reject(err);
			}
			//设置重连次数
			ReloadConnect(MyRequest, config, () => {
				message.error(`${config.url}重连失败`);
				if (router.currentRoute.value.fullPath === '/login') {
					//重连失败回调
					router.push('/500');
				} else {
					router.push('/layout/500');
				}
			});
			return Promise.reject(err);
		},
	},
});
