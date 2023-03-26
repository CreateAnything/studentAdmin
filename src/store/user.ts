/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MenuTree } from '@/views/admin/authority/menu/type';
import { Roels } from '@/views/admin/authority/user/type';
import { UserInfo } from '@/views/common/login/type';
import { defineStore } from 'pinia';
import { State } from './type/user.type';
export const useUserStore = defineStore('user', {
	state: (): State => ({
		userInfo: {
			roleId: Roels.Admin,
			token: '',
			menuList: [],
			username: '',
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
