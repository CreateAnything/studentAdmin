import { MenuItem } from 'global';

export const studentMenu: MenuItem[] = [
	{
		path: '/student/grade',
		name: '我的成绩',
		icon: 'home',
		key: 'grade',
		order: 1,
		enable: true,
		isLink: true,
		description: '我的成绩',
		parentId: '000000',
		isMenu: true,
		id: '01234',
	},
	{
		path: '/student/person',
		name: '个人信息',
		icon: 'home',
		key: 'person',
		order: 1,
		enable: true,
		isLink: true,
		description: '个人信息',
		parentId: '000000',
		isMenu: true,
		id: '0123',
	},
];
export const menuList: MenuItem[] = [
	{
		path: '/admin/home',
		name: '首页',
		icon: 'home',
		key: 'home',
		order: 1,
		enable: true,
		isLink: true,
		description: '管理员首页',
		parentId: '000000',
		isMenu: true,
		id: '0',
	},
	{
		path: '/admin/base',
		name: '基础信息',
		icon: 'base',
		key: 'base',
		order: 7,
		enable: true,
		isLink: false,
		description: '基础信息',
		parentId: '000000',
		isMenu: true,
		id: '7',
		children: [
			{
				path: '/admin/base/class',
				name: '班级管理',
				icon: 'class',
				key: 'base_class',
				order: 2,
				enable: true,
				isLink: true,
				description: '班级管理',
				parentId: '7',
				isMenu: false,
				id: '71',
			},
			{
				path: '/admin/base/course',
				name: '课程管理',
				icon: 'course',
				key: 'base_course',
				order: 2,
				enable: true,
				isLink: true,
				description: '课程管理',
				parentId: '7',
				isMenu: false,
				id: '712',
			},
		],
	},
	{
		path: '/admin/information',
		name: '信息管理',
		icon: 'message',
		key: 'information',
		order: 2,
		enable: true,
		isLink: false,
		description: '信息管理',
		parentId: '000000',
		isMenu: true,
		id: '1',
		children: [
			{
				path: '/admin/information/studentInformation',
				name: '学生信息管理',
				icon: 'student',
				key: 'information_studentInformation',
				order: 2,
				enable: true,
				isLink: true,
				description: '学生信息管理',
				parentId: '1',
				isMenu: true,
				id: '11',
			},
			{
				path: '/admin/information/teacherInformation',
				name: '教师信息管理',
				icon: 'teacher',
				key: 'information_teacherInformation',
				order: 2,
				enable: true,
				isLink: true,
				isMenu: true,
				description: '教师信息管理',
				parentId: '1',
				id: '12',
			},
		],
	},
	{
		path: '/admin/authority',
		name: '权限管理',
		icon: 'role',
		key: 'authority',
		order: 1,
		enable: true,
		isMenu: true,
		isLink: false,
		description: '管理员权限管理',
		parentId: '000000',
		id: '2',
		children: [
			{
				path: '/admin/authority/role',
				name: '角色管理',
				parentId: '2',
				isMenu: true,
				id: '21',
				key: 'authority_role',
				order: 2,
				enable: true,
				isLink: false,
				description: '角色管理',
				icon: 'role',
			},
			{
				path: '/admin/authority/menu',
				name: '菜单管理',
				parentId: '2',
				id: '22',
				key: 'authority_menu',
				order: 2,
				enable: true,
				isMenu: true,
				isLink: true,
				description: '菜单管理',
				icon: 'menu',
			},
		],
	},
];
