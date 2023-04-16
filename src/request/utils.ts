import { createMessage } from '@/utils';
import { AxiosError, AxiosRequestConfig } from 'axios';
import Request from './request';
import { RequestConfig } from './type';
const message = createMessage();
export const switchMessages = (method: AxiosRequestConfig['method']) => {
	switch (method) {
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
};
export const ReloadConnect = (
	request: Request,
	config: RequestConfig,
	flinsh: () => void
) => {
	//设置重连次数
	config._retryCount = config._retryCount || 0;
	//判断是否达到重连次数限制
	console.log(config._retryCount, 'as');
	if (config._retryCount >= config.retry!) {
		flinsh();
		return;
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
			reslove(request.axiosInstance(config));
		}, delay);
	}) as Promise<AxiosError>;
};
