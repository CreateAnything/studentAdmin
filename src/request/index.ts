import { message } from 'ant-design-vue';
import Request from './request';
export const MyRequest = new Request({
	baseURL: `http://localhost:${import.meta.env.VITE_PORT}/api/`,
	timeout: import.meta.env.VITE_TIMEOUT,
	interceptors: {
		requestInterceptors: (config) => {
			return config;
		},
		responseInterceptors: (response) => {
			return response.data;
		},
		responseInterceptorCatch(err) {
			switch (err.response?.status) {
				case 500:
					message.error('服务器连接失败');
					break;
			}
			return Promise.reject(err);
		},
	},
});
