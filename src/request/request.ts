/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';
import { RequestConfig, RequestInterceptors } from './type';

class Request {
	private axiosInstance: AxiosInstance; //定义axios实列
	private interceptors!: RequestInterceptors; //定义拦截器
	constructor(config: RequestConfig) {
		this.axiosInstance = axios.create(config);
		config.interceptors && (this.interceptors = config.interceptors);
		//全局请求拦截器封装
		this.axiosInstance.interceptors.request.use(
			(request: InternalAxiosRequestConfig) => {
				return request;
			},
			(error) => {
				return Promise.reject(error);
			}
		);
		//使用局部请求拦截器
		this.axiosInstance.interceptors.request.use(
			this.interceptors?.requestInterceptors,
			this.interceptors?.requestInterceptorCatch
		);
		//使用局部响应拦截器
		this.axiosInstance.interceptors.response.use(
			this.interceptors?.responseInterceptors,
			this.interceptors?.responseInterceptorCatch
		);
		//全局响应拦截器封装
		this.axiosInstance.interceptors.response.use(
			(response: AxiosResponse) => {
				return response;
			},
			(error) => {
				return Promise.reject(error);
			}
		);
	}
	private request<T>(config: RequestConfig): Promise<T> {
		return new Promise((reslove, reject) => {
			//如果我们为单个请求设置拦截器,这里使用单个请求的拦截器
			if (config.interceptors?.requestInterceptors) {
				config = config.interceptors.requestInterceptors(
					config as InternalAxiosRequestConfig
				);
			}
			this.axiosInstance
				?.request<unknown, T>(config)
				.then((res: any) => {
					//如果我们为单个响应设置拦截器，这里使用单个响应拦截器
					if (config.interceptors?.responseInterceptors) {
						res =
							config.interceptors.responseInterceptors(res);
						reslove(res);
					} else {
						reslove(res);
					}
				})
				.catch((error: AxiosError) => reject(error));
		});
	}

	get<T>(config: RequestConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'GET' });
	}
	post<T>(config: RequestConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'POST' });
	}

	delete<T>(config: RequestConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'DELETE' });
	}

	put<T>(config: RequestConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'PUT' });
	}

	patch<T>(config: RequestConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'PATCH' });
	}
}

export default Request;
