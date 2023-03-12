import publicRoute from '@/router/default';
import { findMoudlesByRole } from '@/router/privateRoute';
import { GetRoutesByMenu, createMenuKeyMap } from '@/utils';
import { defineStore, storeToRefs } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { useUserStore } from './user';
type State = {
	publicRoutes: RouteRecordRaw[];
	privateRoutes: RouteRecordRaw[];
	mapRouteKeys: Record<string, string[]>;
	pathLevel: string[];
	currentPath: string;
};
export const usePremissionStore = defineStore('premission', {
	state: (): State => ({
		publicRoutes: publicRoute, //公共路由
		privateRoutes: [], //私有路由
		mapRouteKeys: {}, //页面的keys映射
		currentPath: '', //当前是哪个页面
		pathLevel: [], //当前选中的路由层级表
	}),
	persist: {
		enabled: true,
		strategies: [
			{
				storage: localStorage,
				paths: [
					'currentPath',
					'mapRouteKeys',
					'historyRoute',
					'pathLevel',
				],
			},
		],
	},
	getters: {
		hasPrivateRoutes: (state) => {
			return state.privateRoutes.length > 0;
		},
		getPathName: (state) => {
			return state.mapRouteKeys[state.pathLevel.at(-1) as string];
		},
		getFatherPath: (state) => {
			return state.pathLevel[0];
		},
		getCurrentPath: ({ pathLevel, privateRoutes }) => {
			return pathLevel.length > 0
				? pathLevel.at(-1)
				: privateRoutes[0].path;
		},
	},
	actions: {
		//设置页面路径映射表
		setRouterKeysMap() {
			const { userInfo } = storeToRefs(useUserStore());
			const MapsSetup = createMenuKeyMap(userInfo.value.menuList);
			this.mapRouteKeys = MapsSetup();
		},
		//将后端菜单数据处理成路由数据
		generateRouter() {
			const { userInfo } = storeToRefs(useUserStore());
			const { modules, type } = findMoudlesByRole(
				userInfo.value.role
			); //获取角色模块下的文件
			this.privateRoutes = GetRoutesByMenu(
				userInfo.value.menuList,
				modules,
				type
			);
		},
	},
});
