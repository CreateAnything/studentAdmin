import { MenuItem } from '@/views/admin/authority/menu/type';
import { Roels } from '@/views/admin/authority/user/type';

export enum Api {
	LOGIN_IN = '/studentmanager/user/login',
}

export interface UserBseInfo {
	token: string;
	menuList: MenuItem[];
	userId?: number;
	roleId: Roels;
}
type Teacher = {
	birthday: string;
	clazzId: number;
	clazzName: string;
	cname: string;
	courseId: string;
	departmentId: number;
	dname: string;
	id: number;
	name: string;
	sex: string;
};
type Student = {
	birthday: string;
	classId: number;
	clazzName: string;
	departmentId: number;
	dname: number;
	id: number;
	name: string;
	password: string;
	scoreDots: any;
	sex: string;
};
export interface TeacherInfo extends UserBseInfo {
	teacher?: Teacher;
}

export interface StudentInfo extends UserBseInfo {
	student?: Student;
}

export type AdminInfo = UserBseInfo;

export interface LoginForm {
	username: string;
	password: string;
}
export type UserInfo = TeacherInfo & AdminInfo & StudentInfo;
