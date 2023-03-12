import { MenuItem } from '@/vite-env';
import { Component } from 'vue';

export enum Role {
	admin = 1,
	teacher = 2,
	student = 3,
}

interface UserType {
	role: Role;
	token: string;
	username: string;
	avatar: string;
	menuList: MenuItem[];
}

interface State {
	userInfo: UserType;
}

interface RoutesModulesType {
	type: string;
	modules: Record<string, Component>;
}

export type { RoutesModulesType, State };
