import { MyRequest } from '@/request/index';
import { Api, DeparmentItem, DpeartmentForm } from './type';

export const findAllDeparment = async (): Promise<DeparmentItem[]> => {
	const result = MyRequest.get<DeparmentItem[]>({
		url: Api.FIND_DEPARMENT,
	});
	return (await result).page;
};

//新增部门
export const addDepartment = async (
	body: DpeartmentForm
): Promise<void> => {
	await MyRequest.post({ url: Api.ADD_DEPARMENT, data: body });
};

//编辑部门
export const editDepartment = async (
	body: DpeartmentForm
): Promise<void> => {
	await MyRequest.put({ url: Api.EDIT_DEPARMENT, data: body });
};
//删除部门
export const removeDepartment = async (ids: number[]): Promise<void> => {
	await MyRequest.delete({ url: Api.DELETE_DEPARMENT, data: ids });
};
