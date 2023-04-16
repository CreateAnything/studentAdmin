import { ModelExpose } from '@/components/commmon/modelForm/type';
import { TableConfig } from '@/components/commmon/table/type';
import { onMounted, ref } from 'vue';
import { createTableConfig } from './config';
import {
	addDepartment,
	editDepartment,
	findAllDeparment,
	removeDepartment,
} from './request';
import { DeparmentItem, DpeartmentForm } from './type';
const useDepartment = () => {
	const departmentList = ref<DeparmentItem[]>([]);
	const loading = ref<boolean>(false);
	const isEdit = ref<boolean>(false);
	const modelRef = ref<ModelExpose>();
	const tableConfig = ref<TableConfig>();
	const departmentForm = ref<DpeartmentForm>({
		name: '',
	});
	const onOpenMode = () => {
		isEdit.value = false;
		modelRef.value?.openModel(isEdit.value);
	};
	const onSubmit = async () => {
		if (!isEdit.value) {
			await addDepartment(departmentForm.value);
		} else {
			await editDepartment(departmentForm.value);
		}
		init();
	};
	const onEdit = (payload: DeparmentItem) => {
		isEdit.value = true;
		modelRef.value?.openModel(isEdit.value, payload);
	};
	const onRemove = async (id: number) => {
		await removeDepartment([id]);
		init();
	};
	const init = async () => {
		loading.value = true;
		departmentList.value = await findAllDeparment();
		tableConfig.value = createTableConfig();
		loading.value = false;
	};
	onMounted(() => {
		init();
	});
	return {
		loading,
		departmentList,
		departmentForm,
		modelRef,
		tableConfig,
		onOpenMode,
		onSubmit,
		onEdit,
		onRemove,
	};
};

export default useDepartment;
