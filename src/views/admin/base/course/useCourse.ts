import {
	FormItem,
	ModelExpose,
} from '@/components/commmon/modelForm/form/type';
import { TableColumnsType } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { createModelConfig, createTableColums } from './config';
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
	const modelRef = ref<ModelExpose>();
	const TableColums = ref<TableColumnsType>([]);
	const ModelConfig = ref<FormItem[]>([]);
	const courseForm = ref<CourseForm>({
		name: '',
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
		if (!isEdit.value) {
			await addCourse(courseForm.value);
		} else {
			await editCourse(courseForm.value);
		}
		init();
	};

	const init = async () => {
		loading.value = true;
		courseList.value = await findAllCourse();
		TableColums.value = createTableColums();
		ModelConfig.value = createModelConfig();
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
		TableColums,
		ModelConfig,
		courseList,
		courseForm,
	};
};

export default useCourse;
