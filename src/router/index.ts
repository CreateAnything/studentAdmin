import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import defaultRouter from './default';
const routes: RouteRecordRaw[] = [...defaultRouter];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
