import type {
	AxiosError,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';

enum RequestEnums {
	TIMEOUT = 10000, // 请求超时 request timeout
	FAIL = 500, // 服务器异常 server error
	LOGINTIMEOUT = 401, // 登录超时 login timeout
	SUCCESS = 200, // 请求成功 request successfully
}

interface GetPage<T> {
	currPage: number;
	list: T[];
	pageSize: number;
	totalCount: number;
	totalPage: number;
}
interface GetResponse<T> {
	code: number;
	msg: string;
	page: GetPage<T>;
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
	responseInterceptors?: (config: AxiosResponse) => AxiosResponse;
	responseInterceptorCatch?: (
		error: AxiosError
	) => AxiosError | Promise<AxiosError>;
}

//请求参数配置
interface RequestConfig extends AxiosRequestConfig {
	interceptors?: RequestInterceptors;
}
export type {
	GetResponse,
	RequestConfig,
	RequestEnums,
	RequestInterceptors,
};
