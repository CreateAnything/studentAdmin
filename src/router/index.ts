import { App } from 'vue';
import {
	createRouter,
	createWebHistory,
	RouteRecordRaw,
} from 'vue-router';

import PublicRouteModules from './default';
import { createRouterGuards } from './premission';
const routes: RouteRecordRaw[] = [...PublicRouteModules];

const router = createRouter({
	history: createWebHistory(),
	routes: routes,
});

export function setupRouter(app: App) {
	createRouterGuards(router, routes);
	app.use(router);
}

export default router;
