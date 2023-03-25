import { MyRequest } from '@/request/index';
import { Api, User, UserForm } from './type';

//新增用户
export const addUser = async (body: UserForm): Promise<void> => {
	await MyRequest.post({ url: Api.ADD_USER, data: body });
};

//删除用户
export const removeUser = async (ids: number[]): Promise<void> => {
	await MyRequest.delete({ url: Api.DELETE_USER, data: ids });
};

//修改用户
export const editUser = async (body: UserForm): Promise<void> => {
	await MyRequest.put({ url: Api.EDIT_USER, data: body });
};

//查找用户列表
export const findAllUser = async (): Promise<User[]> => {
	const result = await MyRequest.get<User[]>({ url: Api.FIND_USER });
	return result.page;
};
