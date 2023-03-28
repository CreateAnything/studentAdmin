import { useUserStore } from '@/store/user';
import { computed, onMounted, ref } from 'vue';
import { findStudentListById, updateStudentScore } from './request';
import { ScoreDots, StudentItem, UpdateScoreForm } from './type';
const user = useUserStore();
const courseId = user.userInfo.teacher?.courseId as string;
const useScore = () => {
	const loading = ref<boolean>(false);
	const studentList = ref<StudentItem[]>([]);
	const getCourseName = computed(() => {
		return user.userInfo.teacher?.cname;
	});

	const getScore = computed(() => {
		return (scores: ScoreDots[]) => {
			if (scores && scores.length === 0) return '-';
			return scores.find(
				(course) => course.courseId === parseInt(courseId)
			)?.score;
		};
	});
	const onUpdateScore = async (payload: UpdateScoreForm[]) => {
		await updateStudentScore(payload);
		init();
	};
	const init = async () => {
		const id = user.userInfo.teacher?.clazzId;
		loading.value = true;
		if (id) {
			studentList.value = await findStudentListById(id);
		}
		loading.value = false;
	};

	onMounted(() => {
		init();
	});
	return {
		loading,
		getCourseName,
		studentList,
		getScore,
		onUpdateScore,
	};
};

export default useScore;
