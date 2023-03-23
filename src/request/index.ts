import { createMessage } from '@/utils';
import Request from './request';
import { RequestConfig } from './type';
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
			switch (response.config.method) {
				case 'post':
					message.success('新增成功');
					break;
				case 'delete':
					message.success('删除成功');
					break;
				case 'put':
					message.success('编辑成功');
					break;
			}
			return response.data;
		},
		responseInterceptorCatch(err) {
			console.log(err);
			const config = err.config as RequestConfig;
			const status = err.response?.status;

			//如果没用配置重连选项,直接返回错误
			if (!config.retry || status !== 500) {
				switch (status) {
					case 404:
						message.error('未知的链接接口');
						break;
				}
				return Promise.reject(err);
			}
			//设置重连次数
			config._retryCount = config._retryCount || 0;
			//判断是否达到重连次数限制
			if (config._retryCount >= config.retry) {
				message.error(`${config.url}重连失败`);
				return Promise.reject(err);
			}
			//计算重连延时时间
			const delay = config.retryDelay || 0;
			//重连次数加1
			config._retryCount += 1;
			//返回一个新的Promise，重新请求
			return new Promise((reslove) => {
				setTimeout(() => {
					message.error(
						`服务器连接失败,${config.url}正在第${config._retryCount}次重连中....`
					);
					reslove(MyRequest.axiosInstance(config));
				}, delay);
			});
		},
	},
});
