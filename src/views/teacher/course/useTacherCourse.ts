import { useUserStore } from '@/store/user';
import { onMounted, ref } from 'vue';
import { findCourseInfo } from './request';
const user = useUserStore();
const id = user.userInfo.teacher?.courseId as string;
const useTeacherCourse = () => {
	const course = ref<any>();
	const loading = ref<boolean>(false);

	const init = async () => {
		course.value = await findCourseInfo(id);
		console.log(course.value);
	};
	onMounted(() => {
		init();
	});
	return { course, loading };
};

export default useTeacherCourse;
