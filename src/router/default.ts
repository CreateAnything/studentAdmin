import { RouteRecordRaw } from 'vue-router';
const Login = () => import('@/views/login/index.vue');
const Entry = () => import('@/views/entry/index.vue');
const defaultRouter: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/entry',
    component: Entry,
  },
];
export default defaultRouter;
