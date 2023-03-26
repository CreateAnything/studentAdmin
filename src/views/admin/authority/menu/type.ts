import { Roels } from '../user/type';

export enum Api {
	ADD_MENU = '/studentmanager/sysmenu/save',
	DELETE_MENU = '/studentmanager/sysmenu/delete',
	EDIT_MENU = '/studentmanager/sysmenu/update',
	FIND_MENU = '/studentmanager/sysmenu/list',
	FIND_MENUBYROLE = '/studentmanager/sysmenu/role',
}

export interface MenuForm {
	description: string;
	enable?: number;
	icon: string;
	isLink?: number;
	isMenu?: number;
	keyd: string;
	name: string;
	parentId: number | undefined;
	roleId: Roels;
	sort: number;
	url: string;
}
export interface TabsConfigType {
	tabsName: string;
	key: Roels;
}

export interface MenuItem extends MenuForm {
	id: number;
}

export interface MenuTree extends MenuItem {
	children: MenuTree[];
}
