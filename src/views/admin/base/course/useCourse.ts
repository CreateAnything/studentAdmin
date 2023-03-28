import {
	FormItem,
	ModelExpose,
} from '@/components/commmon/modelForm/form/type';
import { TableConfig } from '@/components/commmon/table/type';
import { onMounted, ref } from 'vue';
import { findAllTeacher } from '../teacher/request';
import { Teacher } from '../teacher/type';
import { createModelConfig, createTableConfig } from './config';
import {
	addCourse,
	editCourse,
	findAllCourse,
	removeCourse,
} from './request';
import { CourseForm, CourseItem } from './type';
const useCourse = () => {
	const loading = ref<boolean>(false);
	const isEdit = ref<boolean>(false);
	const courseList = ref<CourseItem[]>([]);
	const teacherList = ref<Teacher[]>([]);
	const modelRef = ref<ModelExpose>();
	const tableConfig = ref<TableConfig>();
	const ModelConfig = ref<FormItem[]>([]);
	const courseForm = ref<CourseForm>({
		name: '',
		week: 1,
		section: 1,
		address: '',
		classTime: '12:00',
		teacherId: undefined,
	});

	const onOpenModel = () => {
		isEdit.value = false;
		modelRef.value?.openModel(isEdit.value);
	};
	const onRemove = async (id: number) => {
		await removeCourse([id]);
		init();
	};

	const onEdit = (pyload: CourseItem) => {
		isEdit.value = true;
		modelRef.value?.openModel(isEdit.value, pyload);
	};

	const onSubmit = async () => {
		const address = courseForm.value.address as string[];
		courseForm.value.address = address.join('/');
		if (!isEdit.value) {
			await addCourse(courseForm.value);
		} else {
			await editCourse(courseForm.value);
		}
		init();
	};

	const init = async () => {
		loading.value = true;
		teacherList.value = await findAllTeacher();
		courseList.value = await findAllCourse();
		tableConfig.value = createTableConfig();
		ModelConfig.value = createModelConfig({
			data: {
				teacherId: teacherList.value,
			},
		});
		console.log(courseList.value);
		loading.value = false;
	};

	onMounted(() => {
		init();
	});
	return {
		loading,
		onRemove,
		onEdit,
		onSubmit,
		onOpenModel,
		modelRef,
		tableConfig,
		ModelConfig,
		courseList,
		courseForm,
	};
};

export default useCourse;
