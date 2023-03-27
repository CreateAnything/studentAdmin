/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MenuTree } from '@/views/admin/authority/menu/type';
import { Roels } from '@/views/admin/authority/user/type';
import { UserInfo } from '@/views/common/login/type';
import { defineStore } from 'pinia';
import { UserRootState } from './type/user.type';
export const useUserStore = defineStore('user', {
	state: (): UserRootState => ({
		userInfo: {
			token: '',
			roleId: Roels.Admin,
			menuList: [],
		},
		menuTree: [],
	}),
	persist: {
		enabled: true,
		strategies: [
			{ storage: localStorage, paths: ['userInfo', 'menuTree'] },
		],
	},
	getters: {
		//判断是否有菜单
		hasMenu: (state) => state.userInfo.menuList.length > 0,
		//获取用户姓名
		userName: ({ userInfo }) => {
			return (
				userInfo.teacher?.name ||
				userInfo.student?.name ||
				'admin'
			);
		},
		//是否是老师
		isTeacher: (state) => state.userInfo.roleId === Roels.Teacher,
		//是否是管理员
		isAdmin: (state) => state.userInfo.roleId === Roels.Admin,
		//是否是学生
		isStudent: (state) => state.userInfo.roleId === Roels.Student,
		//角色中文
		roleName: ({ userInfo }) =>
			userInfo.roleId === Roels.Admin
				? '管理员'
				: userInfo.roleId === Roels.Teacher
				? '教师'
				: '学生',
	},
	actions: {
		setUserInfo(payload: UserInfo) {
			this.userInfo = payload;
		},
		setUserMenu(payload: MenuTree[]) {
			this.menuTree = payload;
		},
	},
});
