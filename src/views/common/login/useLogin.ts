import { useGlobalStore } from '@/store/global';
import { useHistoryStore } from '@/store/history';
import { usePremissionStore } from '@/store/premission';
import { useUserStore } from '@/store/user';
import { GetListToTree, createMessage } from '@/utils';
import { reactive } from 'vue';
import { Router } from 'vue-router';
import { userLogin } from './request';
import { LoginForm } from './type';
const global = useGlobalStore();
const user = useUserStore();
const premission = usePremissionStore();
const history = useHistoryStore();
const message = createMessage();
const useLogin = (router: Router) => {
	const formState = reactive<LoginForm>({
		username: 'admin',
		password: '123456',
	});
	const onFinish = async (): Promise<void> => {
		startLogin();
	};
	const resetStore = () => {
		global.$reset();
		premission.$reset();
		user.$reset();
		history.$reset();
	};
	const startLogin = async () => {
		resetStore();
		const result = await userLogin(formState);
		let firstPage: { name: string; path: string } = {
			name: '',
			path: '',
		};
		if (result) {
			const menuTree = GetListToTree({ data: result.menuList });
			if (menuTree.length === 0) {
				message.error('该用户没有菜单请联系管理员添加菜单后使用');
				return;
			}
			if (menuTree[0].children.length > 0) {
				firstPage = {
					path: menuTree[0].children[0].url,
					name: menuTree[0].children[0].name,
				};
			} else {
				firstPage = {
					path: menuTree[0].url,
					name: menuTree[0].name,
				};
			}
			user.menuTree = menuTree;
			user.userInfo = result;
			const layout = premission.loginLoadRoutes(
				menuTree,
				result.roleId
			);
			router.addRoute(layout!);
			global.home = firstPage;
			history.setStack({
				name: firstPage.name,
				path: firstPage.path,
			});
			router.push(firstPage.path);
			message.success('登陆成功!');
		}
	};
	return { formState, onFinish };
};

export default useLogin;
