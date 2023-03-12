import { RouteRecordRaw } from 'vue-router';
const Login = () => import('@/views/common/login/index.vue');
const LayOut = () => import('@/views/common/layout/index.vue');
const NotFound = () =>
	import('@/views/common/error/notFundErr/index.vue');
const NetWorkError = () =>
	import('@/views/common/error/networkErr/index.vue');
const publicRoute: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/login',
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: { title: '登录' },
	},
	{
		path: '/404',
		name: '404',
		component: NotFound,
		meta: { title: '404' },
	},
	{
		path: '/400',
		name: '400',
		component: NetWorkError,
		meta: { title: '400' },
	},
	{
		path: '/layout',
		name: 'sysjindex',
		component: LayOut,
	},
	// {
	// 	path: '/:catchAll(.*)',
	// 	redirect: '/404',
	// },
];
export default publicRoute;
