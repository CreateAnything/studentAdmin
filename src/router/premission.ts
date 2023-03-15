import store from '@/store/index';
import { usePremissionStore } from '@/store/premission';
import { useUserStore } from '@/store/user';
import { Router, RouteRecordRaw } from 'vue-router';
type LoadAsynRouteType<T> = (publicRoute: T[], asyncRoutes: T[]) => T;
enum ELOGINSTATE {
	ISLOGIN = 'login',
	DEFAULT_MAIN = 'sysjindex',
}
const whiteList = ['/login'];

const LoadAsyncRoutes: LoadAsynRouteType<RouteRecordRaw> = (
	publicRoute,
	asyncRoutes
) => {
	const Layout = publicRoute.find(
		(route) => route.name === ELOGINSTATE.DEFAULT_MAIN
	) as RouteRecordRaw;
	Layout.children = [...asyncRoutes];
	Layout.redirect = asyncRoutes[0].path;
	return Layout;
};

export function createRouterGuards(
	router: Router,
	routes: RouteRecordRaw[]
) {
	router.beforeEach((to, form, next) => {
		const user = useUserStore(store);
		const premission = usePremissionStore(store);
		const token = user.userInfo.token;
		document.title = to.meta.title as string;
		if (token) {
			if (!premission.hasPrivateRoutes) {
				premission.generateRouter(); //序列化路由
				const resloveRoutes = premission.privateRoutes;
				if (resloveRoutes.length > 0) {
					const layout = LoadAsyncRoutes(routes, resloveRoutes);
					router.addRoute(layout);
					next({ ...to, replace: true });
				}
			} else {
				//路由注册的情况下直接跳转
				next();
			}
		} else {
			// 没有token
			if (whiteList.indexOf(to.path) !== -1) {
				next(); // 在免登录白名单，直接进入
			} else {
				next({ name: ELOGINSTATE.ISLOGIN }); // 否则全部重定向到登录页
			}
		}
	});
}
