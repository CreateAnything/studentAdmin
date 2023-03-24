import { ModelExpose } from '@/components/commmon/modelForm/form/type';
import { onMounted, reactive, ref } from 'vue';
import { findAllClassList } from '../class/request';
import { ClassItem } from '../class/type';
import { findAllTeacher } from './request';
import { Teacher, TeacherForm } from './type';
const useTeacger = () => {
	const loading = ref<boolean>(false);
	const teacherList = ref<Teacher[]>([]);
	const modelRef = ref<ModelExpose>();
	const classList = ref<ClassItem[]>([]);
	const teacherForm = reactive<TeacherForm>({
		clazz_id: undefined,
		department_id: undefined,
		faculty_id: undefined,
		name: '',
		birthday: '',
		sex: '男',
	});

	const onAdd = () => {
		modelRef.value?.openModel(false);
	};
	const onEdit = (id: number) => {
		console.log(id);
	};
	const onRemove = (id: number) => {
		console.log(id);
	};
	const init = async () => {
		loading.value = true;
		teacherList.value = await findAllTeacher();
		classList.value = await findAllClassList();
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
		onEdit,
		onRemove,
		onAdd,
	};
};

export default useTeacger;
