import { TableConfig } from '@/components/commmon/table/type';
import { TablePaginationConfig } from 'ant-design-vue';
import { Ref, onMounted, ref } from 'vue';
import { findAllCourse } from '../../base/course/request';
import { CourseItem } from '../../base/course/type';
import Add from './add/index.vue';
import { createTableConfig } from './config';
import {
	addStudent,
	deleteStudent,
	editStudent,
	findAllStudentList,
} from './request';
import { EditStudentPaylod, Student } from './type';
const useStudent = (addCompnentRef: Ref<null | typeof Add>) => {
	const id = ref<number>();
	const studentList = ref<Student[]>([]);
	const loading = ref<boolean>(false);
	const editStu = ref<Student>();
	const courseList = ref<CourseItem[]>([]);
	const tableConfig = ref<TableConfig>();
	const pagination = ref<TablePaginationConfig>({
		current: 1,
		pageSize: 5,
	});
	const removeStudent = async (id: number) => {
		await deleteStudent([id]);
		init();
	};
	const onAdd = () => {
		addCompnentRef.value && addCompnentRef.value?.openModel(false);
	};

	const onEdit = async (student: Student) => {
		id.value = student.id;
		addCompnentRef.value &&
			addCompnentRef.value?.openModel(true, student);
	};

	const onAddStudentEvent = async (
		payload: EditStudentPaylod,
		type: boolean
	) => {
		payload.courseIds = JSON.stringify(payload.courseIds);
		if (!type) {
			await addStudent(payload);
		} else {
			payload.id = id.value;
			await editStudent(payload);
		}
		init();
	};
	const init = async () => {
		loading.value = true;
		studentList.value = await findAllStudentList();
		courseList.value = await findAllCourse();
		tableConfig.value = createTableConfig();
		loading.value = false;
	};
	onMounted(() => {
		init();
	});
	return {
		tableConfig,
		studentList,
		loading,
		editStu,
		courseList,
		onEdit,
		onAddStudentEvent,
		removeStudent,
		onAdd,
		init,
		pagination,
	};
};
export default useStudent;
