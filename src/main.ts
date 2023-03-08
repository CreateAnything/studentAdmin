import '@/assets/less/index.less';
import router from '@/router/index';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#app');
