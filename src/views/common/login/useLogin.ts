export type Form = {
	username: string;
	password: string;
	remember: boolean;
};

import { useUserStore } from '@/store/user';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const user = useUserStore();
const useLogin = () => {
	const router = useRouter();
	const formState = reactive<Form>({
		username: 'admin',
		password: '1234567',
		remember: true,
	});
	const onFinish = (): void => {
		user.LoginRequest;
		const path = user.getHomePath;
		router.push(path);
	};
	return { formState, onFinish };
};

export default useLogin;
