import { MyRequest } from '@/request/index';
import { Api, ClassItem } from './type';

//获取全部班级
export const findAllClassList = async (): Promise<ClassItem[]> => {
	const result = await MyRequest.get<ClassItem[]>({
		url: Api.FIND_CALSS,
	});
	return result.page;
};
