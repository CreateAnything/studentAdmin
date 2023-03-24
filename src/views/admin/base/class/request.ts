import { MyRequest } from '@/request/index';
import { Api, ClassForm, ClassItem } from './type';

//获取全部班级
export const findAllClassList = async (): Promise<ClassItem[]> => {
	const result = await MyRequest.get<ClassItem[]>({
		url: Api.FIND_CALSS,
	});
	return result.page;
};

//新增班级
export const addClass = async (body: ClassForm): Promise<void> => {
	await MyRequest.post({ url: Api.SAVE_CLASS, data: body });
};

//删除班级
export const deleteClass = async (ids: number[]): Promise<void> => {
	await MyRequest.delete({ url: Api.DELETE_CLASS, data: ids });
};

//根据id获取单个班级
export const findClassById = async (id: number): Promise<ClassItem> => {
	const result = await MyRequest.get<ClassItem>({
		url: Api.FIND_CLASSBYID + '/' + id,
	});
	return result.page;
};

//编辑班级信息
export const editClass = async (body: ClassForm): Promise<void> => {
	await MyRequest.put({ url: Api.EDIT_CLASS, data: body });
};
