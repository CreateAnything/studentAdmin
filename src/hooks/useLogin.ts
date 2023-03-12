import { message } from 'ant-design-vue';
import { ref } from 'vue';

const useLoging = () => {
	const isLoging = ref<boolean>(false);
	async function setLoging<T, D>(
		loginApi: (data: T) => Promise<D>,
		data: T
	): Promise<Awaited<D>> {
		try {
			isLoging.value = true;
			const result = await loginApi(data);
			isLoging.value = false;
			message.success('登陆成功！');
			return result;
		} catch (err: unknown) {
			isLoging.value = false;
			throw new Error(err as string | undefined);
		}
	}
	return {
		isLoging,
		setLoging,
	};
};

export default useLoging;
