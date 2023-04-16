import publicRoute, { ErrorRoutes } from '@/router/default';
import { findMoudlesByRole } from '@/router/privateRoute';
import { GetRoutesByMenu, createMenuKeyMap } from '@/utils';
import { MenuTree } from '@/views/admin/authority/menu/type';
import { Roels } from '@/views/admin/authority/user/type';
import { defineStore, storeToRefs } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { useUserStore } from './user';
type State = {
	privateRoutes: RouteRecordRaw[];
	mapRouteKeys: Record<string, string[]>;
	currentPath: string | number;
};
enum ELOGINSTATE {
	DEFAULT_MAIN = 'sysjindex',
}
export const usePremissionStore = defineStore('premission', {
	state: (): State => ({
		privateRoutes: [], //私有路由
		mapRouteKeys: {}, //页面的keys映射
		currentPath: '', //当前是哪个页面
	}),
	persist: {
		enabled: true,
		strategies: [
			{
				storage: localStorage,
				paths: ['currentPath', 'mapRouteKeys', 'historyRoute'],
			},
		],
	},
	getters: {
		hasPrivateRoutes: (state) => {
			return state.privateRoutes.length > 0;
		},
		getBreadcrumbNams: (state) => {
			return state.mapRouteKeys[state.currentPath];
		},
	},
	actions: {
		//设置页面路径映射表
		setRouterKeysMap() {
			const { menuTree } = storeToRefs(useUserStore());
			const MapsSetup = createMenuKeyMap(menuTree.value);
			this.mapRouteKeys = MapsSetup();
		},
		//将后端菜单数据处理成路由数据
		generateRouter() {
			const { userInfo, menuTree } = storeToRefs(useUserStore());
			if (menuTree.value.length > 0) {
				const { modules, type } = findMoudlesByRole(
					userInfo.value.roleId
				); //获取角色模块下的文件
				this.privateRoutes = GetRoutesByMenu(
					menuTree.value,
					modules,
					type
				);
			}
		},
		loadRouteToLayout(): RouteRecordRaw {
			const Layout = publicRoute.find(
				(route) => route.name === ELOGINSTATE.DEFAULT_MAIN
			) as RouteRecordRaw;
			Layout.children = [...this.privateRoutes, ...ErrorRoutes];
			Layout.redirect = this.privateRoutes[0].path;
			return Layout;
		},
		pressionLoadRoutes() {
			this.generateRouter();
			if (this.privateRoutes.length > 0) {
				return this.loadRouteToLayout();
			}
		},
		loginLoadRoutes(menuTree: MenuTree[], roleId: Roels) {
			if (menuTree.length > 0) {
				const { modules, type } = findMoudlesByRole(roleId); //获取角色模块下的文件
				this.privateRoutes = GetRoutesByMenu(
					menuTree,
					modules,
					type
				);
				if (this.privateRoutes.length > 0) {
					const layout =
						this.loadRouteToLayout() as RouteRecordRaw;
					return layout;
				}
			}
		},
	},
});
