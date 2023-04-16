import { ValidatorRules } from 'type';

export enum Api {
	ADD_USER = '/studentmanager/user/save',
	DELETE_USER = '/studentmanager/user/delete',
	EDIT_USER = '/studentmanager/user/update',
	FIND_USER = '/studentmanager/user/list',
}
export enum Roels {
	'Student' = 1,
	'Teacher' = 2,
	'Admin' = 3,
}
export interface User {
	id: number;
	username: string;
	isEnabled: Roels;
	password: string;
	roleId: 3;
	createUser: string;
}

export interface UserForm {
	confirmPassword: string; //确认密码
	userName: string; //用户名称
	isEnabled: number; //是否启用
	password: string; //用户密码
	createUser: string; //创建人
	roleId: number; //角色
}

export type ValidatorsType = Record<string, ValidatorRules>;

export type ModelOptions = {
	validator?: ValidatorsType;
};
