import '@/assets/less/index.less';
import SvgIcon from '@/components/commmon/svgIcon/index.vue';
import router, { setupRouter } from '@/router/index';
import '@/router/premission';
import store from '@/store/index';
import 'virtual:svg-icons-register'; //引入图标解析脚本
import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);
app.component('svg-icon', SvgIcon);
setupRouter(app);
app.use(store);
router.isReady().then(() => app.mount('#app'));
