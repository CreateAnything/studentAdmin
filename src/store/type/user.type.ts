import { MenuTree } from '@/views/admin/authority/menu/type';
import { UserInfo } from '@/views/common/login/type';
import { Component } from 'vue';
export enum Api {
	LOGIN_IN = '/studentmanager/user/login',
}

interface RoutesModulesType {
	type: string;
	modules: Record<string, Component>;
}

type UserRootState = {
	userInfo: UserInfo;
	menuTree: MenuTree[];
};
export type { RoutesModulesType, UserRootState };
