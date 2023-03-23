import { SearchConfig } from '@/components/commmon/search/type';
import { TableColumnsType } from 'ant-design-vue';
import { Ref, onMounted, ref } from 'vue';
import Add from './add/index.vue';
import {
	addStudent,
	deleteStudent,
	findAllStudentList,
	findStudentById,
} from './request';
import { Student, StudentForm, StudentSearch } from './type';
const ColumsCofnig: TableColumnsType = [
	{
		title: '序号',
		customRender: (text: { index: number }) => {
			return text.index + 1;
		},
	},
	{
		title: '姓名',
		dataIndex: 'name',
	},
	{
		title: '班级',
		dataIndex: 'clazzName',
	},
	{
		title: '部门',
		dataIndex: 'dname',
	},
	{
		title: '性别',
		dataIndex: 'sex',
	},
	{
		title: '生日',
		dataIndex: 'birthday',
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
const searchConfig: SearchConfig[] = [
	{
		span: 6,
		type: 'input',
		inputType: 'text',
		placeholder: '请输入学生姓名',
		modekey: 'name',
		label: '姓名',
	},
	{
		span: 6,
		type: 'input',
		inputType: 'text',
		placeholder: '请输入学生班级',
		modekey: 'classId',
		label: '班级',
	},
	{
		span: 6,
		type: 'input',
		inputType: 'text',
		placeholder: '请输入学生部门',
		modekey: 'departmentId',
		label: '部门',
	},
];
const useStudent = (addCompnentRef: Ref<null | typeof Add>) => {
	const Colums = ColumsCofnig;
	const config = searchConfig;
	const studentList = ref<Student[]>([]);
	const loading = ref<boolean>(false);
	const editStu = ref<Student>();
	const formState = ref<StudentSearch>({
		name: '',
		classId: '',
		departmentId: '',
	});
	const removeStudent = async (id: number) => {
		await deleteStudent([id]);
		init();
	};
	const onAdd = () => {
		addCompnentRef.value && addCompnentRef.value?.openModel(false);
	};
	const onEdit = async (id: number) => {
		const student = await findStudentById(id);
		addCompnentRef.value &&
			addCompnentRef.value?.openModel(true, student);
	};
	const onAddStudentEvent = async (payload: StudentForm) => {
		await addStudent(payload);
		init();
	};
	const init = async () => {
		loading.value = true;
		studentList.value = await findAllStudentList();
		loading.value = false;
	};
	onMounted(() => {
		init();
	});
	return {
		config,
		formState,
		Colums,
		studentList,
		loading,
		editStu,
		onEdit,
		onAddStudentEvent,
		removeStudent,
		onAdd,
		init,
	};
};
export default useStudent;
