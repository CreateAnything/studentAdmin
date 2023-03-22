import { SearchConfig } from '@/components/commmon/search/type';
import { TableColumnsType } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { findAllStudentList } from './request';
import { Student, StudentSearch } from './type';
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
		dataIndex: 'className',
	},
	{
		title: '部门',
		dataIndex: 'department',
	},
	{
		title: '性别',
		dataIndex: 'sex',
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
		modekey: 'className',
		label: '班级',
	},
	{
		span: 6,
		type: 'input',
		inputType: 'text',
		placeholder: '请输入学生部门',
		modekey: 'department',
		label: '部门',
	},
];
const useStudent = () => {
	const Colums = ColumsCofnig;
	const config = searchConfig;
	const studentList = ref<Student[]>([]);
	const loading = ref<boolean>(false);
	const formState = ref<StudentSearch>({
		name: '',
		className: '',
		department: '',
	});
	const deleteStudent = async (id: string) => {
		await deleteStudent(id);
	};
	const init = async () => {
		studentList.value = await findAllStudentList();
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
		deleteStudent,
	};
};
export default useStudent;
