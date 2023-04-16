import {
	FormItem,
	ModelExpose,
} from '@/components/commmon/modelForm/type';
import { TableConfig } from '@/components/commmon/table/type';
import { onMounted, ref } from 'vue';
import { findAllClassList } from '../class/request';
import { ClassItem } from '../class/type';
import { findAllCourse } from '../course/request';
import { CourseItem } from '../course/type';
import { findAllDeparment } from '../department/request';
import { DeparmentItem } from '../department/type';
import { createModelConfig, createTableConfig } from './config';
import {
	addTeacher,
	editTeacher,
	findAllTeacher,
	removeTeacher,
} from './request';
import { Teacher, TeacherForm } from './type';
const useTeacger = () => {
	const config = ref<FormItem[]>([]);
	const tableConfig = ref<TableConfig>();
	const loading = ref<boolean>(false);
	const teacherList = ref<Teacher[]>([]);
	const departmentList = ref<DeparmentItem[]>([]);
	const isEdit = ref<boolean>(false);
	const modelRef = ref<ModelExpose>();
	const classList = ref<ClassItem[]>([]);
	const courseList = ref<CourseItem[]>([]);
	const teacherForm = ref<TeacherForm>({
		clazzId: undefined,
		departmentId: undefined,
		courseId: undefined,
		name: '',
		birthday: '',
		sex: '男',
	});

	const onAdd = () => {
		isEdit.value = false;
		modelRef.value?.openModel(false);
	};

	const onSubmit = async () => {
		if (!isEdit.value) {
			await addTeacher(teacherForm.value);
		} else {
			await editTeacher(teacherForm.value);
		}
		init();
	};

	const onEdit = async (payload: Teacher) => {
		isEdit.value = true;
		modelRef.value?.openModel(isEdit.value, payload);
	};

	const onRemove = async (id: number) => {
		await removeTeacher([id]);
		init();
	};

	const init = async () => {
		loading.value = true;
		teacherList.value = await findAllTeacher();
		courseList.value = await findAllCourse();
		classList.value = await findAllClassList();
		departmentList.value = await findAllDeparment();
		config.value = createModelConfig(
			classList.value,
			departmentList.value,
			courseList.value
		);
		tableConfig.value = createTableConfig();
		loading.value = false;
	};
	onMounted(() => {
		init();
	});

	return {
		loading,
		teacherList,
		teacherForm,
		modelRef,
		classList,
		config,
		tableConfig,
		onSubmit,
		onEdit,
		onRemove,
		onAdd,
	};
};

export default useTeacger;
