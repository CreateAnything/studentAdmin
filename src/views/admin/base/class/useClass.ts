import { onMounted, ref } from 'vue';
import { findAllClassList } from './request';
import { ClassItem } from './type';
const useClass = () => {
	const classList = ref<ClassItem[]>([]);
	const init = async () => {
		classList.value = await findAllClassList();
	};
	onMounted(() => {
		init();
	});
};

export default useClass;
