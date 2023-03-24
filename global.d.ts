import { RouteRecordRaw } from 'vue-router';

//把属性中指定部分变为可选
declare type ToParitalDes<T, U extends keyof T> = Pick<
	T,
	Exclude<keyof T, U>
> &
	Pick<T, U>;

declare type FormState = {
	[index: string]: any;
};
declare type MenuItem = {
	path: string; //路由跳转地址
	isLink: boolean; //路由是否是一个链接
	key: string; //路由唯一key
	name: string; //路由名称
	order: number; //路由排序
	icon?: string; //路由图标
	parentId: string; //路由父级菜单id
	enable: boolean; //是否启用该路由
	description?: string; //路由描述
	isMenu: boolean; //是否是一个菜单
	children?: MenuItem[]; //路由子列表
	id: string; //当前菜单的id
};
declare type RouterRow = RouteRecordRaw;
