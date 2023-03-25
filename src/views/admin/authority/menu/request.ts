import { MyRequest } from '@/request/index';
import { Roels } from '../user/type';
import { Api, MenuForm, MenuItem } from './type';
//新增菜单
export const addMenu = async (body: MenuForm): Promise<void> => {
	await MyRequest.post({ url: Api.ADD_MENU, data: body });
};
//删除菜单
export const removeMenu = async (ids: number[]): Promise<void> => {
	await MyRequest.delete({ url: Api.DELETE_MENU, data: ids });
};
//修改菜单
export const editMenu = async (body: MenuForm): Promise<void> => {
	await MyRequest.put({ url: Api.EDIT_MENU, data: body });
};
//查找全部菜单
export const findAllMenuList = async (): Promise<MenuItem[]> => {
	const result = await MyRequest.get<MenuItem[]>({
		url: Api.FIND_MENU,
	});
	return result.page;
};
//根据角色获取菜单
export const findMenuListByRoleId = async (
	role: Roels
): Promise<MenuItem[]> => {
	const result = await MyRequest.get<MenuItem[]>({
		url: Api.FIND_MENUBYROLE + '/' + role,
	});
	return result.page;
};
