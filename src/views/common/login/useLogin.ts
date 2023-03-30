import { useGlobalStore } from '@/store/global';
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
const message = createMessage();
const useLogin = (router: Router) => {
	const formState = reactive<LoginForm>({
		username: 'admin',
		password: '123456',
	});
	const onFinish = async (): Promise<void> => {
		const result = await userLogin(formState);
		if (result) {
			const menuTree = GetListToTree({ data: result.menuList });
			if (menuTree.length === 0) {
				message.error('该用户没有菜单请联系管理员添加菜单后使用');
				return;
			}
			let path = '';
			if (menuTree[0].children.length > 0) {
				path = menuTree[0].children[0].url;
				premission.setPathLevel([menuTree[0].url, path]);
			} else {
				path = menuTree[0].url;
				premission.setPathLevel([path]);
			}
			user.setUserMenu(menuTree);
			user.setUserInfo(result);
			global.pathHome = path;
			router.push(path);
			message.success('登陆成功!');
		}
	};
	return { formState, onFinish };
};

export default useLogin;
