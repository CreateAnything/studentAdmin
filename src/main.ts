import '@/assets/less/index.less';
import Confirm from '@/components/commmon/confirm/index.vue';
import SvgIcon from '@/components/commmon/svgIcon/index.vue';
import Loading from '@/directive/loading.directive';
import router, { setupRouter } from '@/router/index';
import '@/router/premission';
import store from '@/store/index';
import { message } from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.less';
import 'virtual:svg-icons-register'; //引入图标解析脚本
import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);
//全局警告提示
app.config.warnHandler = (msg: string) => {
	message.warn(msg);
};
app.directive('loading', Loading);
app.component('svg-icon', SvgIcon);
app.component('confirm', Confirm);
setupRouter(app);
app.use(store);
router.isReady().then(() => app.mount('#app'));
