import { MenuItem } from '@/views/admin/authority/menu/type';
import { Roels } from '@/views/admin/authority/user/type';

export enum Api {
	LOGIN_IN = '/studentmanager/user/login',
}

export interface UserInfo {
	token: string;
	menuList: MenuItem[];
	username: string;
	roleId: Roels;
}
export interface LoginForm {
	username: string;
	password: string;
}
