/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { menuList } from '@/mock/index';
import { MyRequest } from '@/request';
import { usePremissionStore } from '@/store/premission';
import { defineStore } from 'pinia';
import { State } from './type/user.type';

export const useUserStore = defineStore('user', {
	state: (): State => ({
		userInfo: {
			role: 1,
			token: '',
			menuList: [],
			avatar: '',
			username: '',
		},
	}),
	persist: {
		enabled: true,
		strategies: [{ storage: localStorage, paths: ['userInfo'] }],
	},
	getters: {
		//判断是否有菜单
		hasMenu: (state) => state.userInfo.menuList.length > 0,
		//获取首页地址
		getHomePath: (state) => {
			const premission = usePremissionStore();
			const path = state.userInfo.menuList[0].path;
			premission.pathLevel.push(path);
			return path;
		},
		//登录函数
		async LoginRequest() {
			const result = await MyRequest.get({
				url: '/studentmanager/sysuser/list',
			});
			console.log(result);
			console.log('登录了一次');
			this.userInfo = {
				role: 1,
				token: 'admin',
				menuList: menuList,
				avatar: '',
				username: 'admin',
			};
		},
	},
	actions: {},
});
