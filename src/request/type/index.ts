import type {
	AxiosError,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';

export enum BadServerStatus {
	TIMEOUT = 10000, // 请求超时 request timeout
	FAIL = 500, // 服务器异常 server error
	LOGINTIMEOUT = 401, // 登录超时 login timeout
	SUCCESS = 200, // 请求成功 request successfully
}
export enum SuccessStatus {
	PARAMS_ERR = 202, //参数错误
	NOTFOUND = 203, //未找到
	SUCCESS = 200, //成功请求
}

interface GetResponse<T = any> {
	code: SuccessStatus;
	msg: string;
	page: T;
}
interface RequestInterceptors {
	//请求拦截器
	requestInterceptors?: (
		config: InternalAxiosRequestConfig
	) => InternalAxiosRequestConfig;
	requestInterceptorCatch?: (
		err: AxiosError
	) => AxiosError | Promise<AxiosError>;
	//响应拦截器
	responseInterceptors?: (
		config: AxiosResponse<GetResponse>
	) => AxiosResponse<GetResponse>;
	responseInterceptorCatch?: (
		error: AxiosError
	) => AxiosError | Promise<AxiosError>;
}

//请求参数配置
interface RequestConfig extends AxiosRequestConfig {
	interceptors?: RequestInterceptors;
	retry?: number;
	retryDelay?: number;
	_retryCount?: number;
}
export type { GetResponse, RequestConfig, RequestInterceptors };
