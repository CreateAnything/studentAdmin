import { findAllClassList } from '@/views/admin/base/class/request';
import { ClassItem } from '@/views/admin/base/class/type';
import { findAllCourse } from '@/views/admin/base/course/request';
import { findAllDeparment } from '@/views/admin/base/department/request';
import { DeparmentItem } from '@/views/admin/base/department/type';
import { Form } from 'ant-design-vue';
import { Rule } from 'ant-design-vue/es/form';
import { onMounted, reactive, ref } from 'vue';
import { StudentForm } from '../type';
const useForm = Form.useForm;
const myRules: Record<string, Rule[]> = {
	name: [
		{
			required: true,
			trigger: 'change',
			message: '请输入学生姓名',
		},
	],
	classId: [
		{
			required: true,
			trigger: 'change',
			message: '请输入学生班级',
		},
	],
	password: [
		{
			required: true,
			trigger: 'change',
			message: '请输入学生密码',
		},
	],
};
const useAdd = () => {
	const visible = ref<boolean>();
	const isEdit = ref<boolean>(false);
	const dateFormat = ref<string>('YYYY-MM-DD');
	const classList = ref<ClassItem[]>([]);
	const departmentList = ref<DeparmentItem[]>([]);
	const courseList = ref<any[]>([]);
	const formState = ref<StudentForm>({
		classId: undefined,
		sex: '男',
		name: '',
		departmentId: undefined,
		birthday: '',
		password: '',
		courseIds: undefined,
	});
	const rules = reactive<Record<string, Rule[]>>(myRules);

	const { resetFields, validate, validateInfos } = useForm(
		formState,
		rules
	);

	const init = async () => {
		classList.value = await findAllClassList();
		courseList.value = await findAllCourse();
		departmentList.value = await findAllDeparment();
	};
	onMounted(() => {
		init();
	});
	return {
		rules,
		formState,
		visible,
		isEdit,
		courseList,
		validate,
		resetFields,
		validateInfos,
		dateFormat,
		departmentList,
		classList,
	};
};

export default useAdd;
