import {
	FormItem,
	ModelExpose,
} from '@/components/commmon/modelForm/form/type';
import { TableColumnsType } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { findAllTeacher } from '../teacher/request';
import { Teacher } from '../teacher/type';
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
const ColumsCofnig: TableColumnsType = [
	{
		title: '序号',
		customRender: (text: { index: number }) => {
			return text.index + 1;
		},
	},
	{
		title: '班级',
		dataIndex: 'clazzName',
	},
	{
		title: '班主任姓名',
		dataIndex: 'tname',
	},
	{
		title: '操作',
		key: 'action',
	},
].map((item) => ({
	...item,
	key: item.dataIndex || item.key,
	align: 'center',
}));

const useClass = () => {
	const loading = ref<boolean>(false);
	const isEdit = ref<boolean>(false);
	const classList = ref<ClassItem[]>([]);
	const teacherList = ref<Teacher[]>([]);
	const configs = ref<FormItem[]>([]);
	const colums = ref<TableColumnsType>(ColumsCofnig);
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
		configs.value = createFormConfig(teacherList.value);
		loading.value = false;
	};
	onMounted(() => {
		init();
	});
	return {
		classList,
		teacherList,
		loading,
		configs,
		colums,
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
