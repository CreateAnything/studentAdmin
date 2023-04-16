import { useGlobalStore } from '@/store/global';
import store from '@/store/index';
import { usePremissionStore } from '@/store/premission';
import { useUserStore } from '@/store/user';
import { Router } from 'vue-router';

export function createRouterGuards(router: Router) {
	router.beforeEach((to, _form, next) => {
		const user = useUserStore(store);
		const premission = usePremissionStore(store);
		const global = useGlobalStore();
		const token = user.userInfo.token;
		document.title = to.meta.title as string;
		if (token) {
			if (!premission.hasPrivateRoutes) {
				const layout = premission.pressionLoadRoutes();
				router.addRoute(layout!);
				next(to);
			} else {
				//路由注册的情况下直接跳转
				next();
			}
		} else if (!to.meta.Auth) {
			//如果该页面为免登页面则直接跳转
			next();
		} else {
			if (to.name !== global.defaultRedirect) {
				next({ name: global.defaultRedirect });
			} else {
				next();
			}
		}
	});
}
