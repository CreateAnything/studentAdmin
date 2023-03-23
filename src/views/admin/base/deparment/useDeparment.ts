import { onMounted, ref } from 'vue';
import { findAllDeparment } from './request';
import { DeparmentItem } from './type';
const useDepartment = () => {
	const departmentList = ref<DeparmentItem[]>([]);

	const init = async () => {
		departmentList.value = await findAllDeparment();
	};
	onMounted(() => {
		init();
	});
};

export default useDepartment;
