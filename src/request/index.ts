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
			return Promise.reject(err);
		},
	},
});
