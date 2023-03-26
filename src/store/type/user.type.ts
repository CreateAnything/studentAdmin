import { MenuItem, MenuTree } from '@/views/admin/authority/menu/type';
import { Roels } from '@/views/admin/authority/user/type';
import { Component } from 'vue';
export enum Api {
	LOGIN_IN = '/studentmanager/user/login',
}
interface UserPaylod {
	token: string;
	menuList: MenuItem[];
	username: string;
	roleId: Roels;
}

interface State {
	userInfo: UserPaylod;
	menuTree: MenuTree[];
}

interface RoutesModulesType {
	type: string;
	modules: Record<string, Component>;
}

export type { RoutesModulesType, State, UserPaylod };
