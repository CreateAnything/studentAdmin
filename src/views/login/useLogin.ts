export type Form = {
  username: string;
  password: string;
  remember: boolean;
};

import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const useLogin = () => {
  const formState = reactive<Form>({
    username: 'admin',
    password: '1234567',
    remember: true,
  });
  const router = useRouter();
  const onFinish = (): void => {
    router.push({ path: '/entry' });
  };
  return { formState, onFinish };
};

export default useLogin;
