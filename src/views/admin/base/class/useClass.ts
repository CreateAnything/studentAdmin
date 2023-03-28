import {
	FormItem,
	ModelExpose,
} from '@/components/commmon/modelForm/form/type';
import { TableConfig } from '@/components/commmon/table/type';
import { onMounted, ref } from 'vue';
import { findAllTeacher } from '../teacher/request';
import { Teacher } from '../teacher/type';
import { createTableConfig } from './config';
import {
	addClass,
	deleteClass,
	editClass,
	findAllClassList,
} from './request';
import { ClassForm, ClassItem } from './type';
const createFormConfig = (teacherList: Teacher[]): FormItem[] => {
	const FormConfig: FormItem[] = [
		{
			type: 'input',
			inputType: 'text',
			label: '班级',
			key: 'clazzName',
			placeholder: '请输入班级名称',
			span: 6,
			rules: [
				{
					required: true,
					trigger: 'change',
					message: '请输入班级名称',
				},
			],
		},
		{
			type: 'select',
			label: '班主任',
			key: 'chargeId',
			placeholder: '请选择班主任',
			rules: [
				{
					required: true,
					trigger: 'change',
					message: '请选择班主任',
				},
			],
			span: 6,
			options: teacherList.map((item) => ({
				label: item.name,
				value: item.id,
			})),
		},
	];
	return FormConfig;
};

const useClass = () => {
	const loading = ref<boolean>(false);
	const isEdit = ref<boolean>(false);
	const classList = ref<ClassItem[]>([]);
	const teacherList = ref<Teacher[]>([]);
	const configs = ref<FormItem[]>([]);
	const tableConfig = ref<TableConfig>();
	const modelRef = ref<ModelExpose>();
	const stateForm = ref<ClassForm>({
		chargeId: undefined,
		clazzName: '',
	});

	const onSubmit = async () => {
		if (isEdit.value) {
			await editClass(stateForm.value);
		} else {
			await addClass(stateForm.value);
		}
		init();
	};
	const onAdd = () => {
		isEdit.value = false;
		modelRef.value?.openModel(isEdit.value);
	};

	const onEdit = async (payload: ClassItem) => {
		isEdit.value = true;
		modelRef.value?.openModel(isEdit.value, payload);
	};

	const removeClass = async (id: number) => {
		await deleteClass([id]);
		init();
	};

	const init = async () => {
		loading.value = true;
		classList.value = await findAllClassList();
		teacherList.value = await findAllTeacher();
		tableConfig.value = createTableConfig();
		configs.value = createFormConfig(teacherList.value);
		loading.value = false;
	};
	onMounted(() => {
		init();
	});
	return {
		classList,
		teacherList,
		tableConfig,
		loading,
		configs,
		isEdit,
		stateForm,
		onAdd,
		onSubmit,
		onEdit,
		removeClass,
		modelRef,
	};
};

export default useClass;
