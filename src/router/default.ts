import { RouteRecordRaw } from 'vue-router';
const Login = () => import('@/views/common/login/index.vue');
const LayOut = () => import('@/views/common/layout/index.vue');
const NotFound = () =>
	import('@/views/common/error/notFundErr/index.vue');
const NetWorkError = () =>
	import('@/views/common/error/networkErr/index.vue');
const defaultBackground = () => import('@/views/common/entry/index.vue');
export const ErrorRoutes: RouteRecordRaw[] = [
	{
		path: '/:pathMatch(.*)*',
		name: '404',
		component: NotFound,
		meta: { title: '404', Auth: false },
	},
	{
		path: '/layout/500',
		name: '500',
		component: NetWorkError,
		meta: { title: '500', Auth: false },
	},
];
const publicRoute: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/entry',
	},
	{
		path: '/entry',
		component: defaultBackground,
		name: 'entry',
		meta: { title: '系统入口', Auth: false },
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: { title: '登录', Auth: false },
	},
	{
		path: '/500',
		name: '500',
		component: NetWorkError,
		meta: { title: '500', Auth: false },
	},
	{
		path: '/layout',
		name: 'sysjindex',
		component: LayOut,
	},
];
export default publicRoute;
