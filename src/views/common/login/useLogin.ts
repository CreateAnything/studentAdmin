import { usePremissionStore } from '@/store/premission';
import { useUserStore } from '@/store/user';
import { GetListToTree, createMessage } from '@/utils';
import { reactive } from 'vue';
import { Router } from 'vue-router';
import { userLogin } from './request';
import { LoginForm } from './type';
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
			user.setUserMenu(menuTree);
			user.setUserInfo(result);
			const path = menuTree[0].url;
			router.push(path);
			premission.setPathLevel([path]);
			message.success('登陆成功!');
		}
	};
	return { formState, onFinish };
};

export default useLogin;
