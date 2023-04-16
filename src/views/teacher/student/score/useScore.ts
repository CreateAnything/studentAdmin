import { useUserStore } from '@/store/user';
import { createMessage } from '@/utils';
import { computed, onMounted, ref } from 'vue';
import * as XLSX from 'xlsx';
import { findStudentListById, updateStudentScore } from './request';
import {
	MyStudent,
	ScoreDots,
	StudentItem,
	UpdateScoreForm,
	XlsKey,
} from './type';
const user = useUserStore();
const message = createMessage();
const courseId = user.userInfo.teacher?.courseId as string;
type XlsMapKey = { name: string; key: XlsKey };
const xlsMap: XlsMapKey[] = [
	{
		name: '姓名',
		key: 'name',
	},
	{
		name: '部门',
		key: 'dname',
	},
	{
		name: '班级',
		key: 'clazzName',
	},
	{
		name: '成绩',
		key: 'score',
	},
];
interface Student extends StudentItem {
	score?: number | string;
}
const useScore = () => {
	const loading = ref<boolean>(false);
	const studentList = ref<MyStudent[]>([]);
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

	const getStudentScore = (scores: ScoreDots[]): string | number => {
		if (scores && scores.length === 0) return '-';
		return (
			scores.find(
				(course) => course.courseId === parseInt(courseId)
			)?.score || '-'
		);
	};

	const onUpdateScore = async (payload: UpdateScoreForm[]) => {
		await updateStudentScore(payload);
		init();
	};

	//到处
	const onExport = () => {
		if (studentList.value.length === 0) {
			message.warning('暂无可导出的学生');
			return;
		}
		const sourse = [];
		sourse[0] = xlsMap.map((it) => it.name);
		studentList.value.forEach((item) => {
			const res = xlsMap.map((it) => {
				return item[it.key];
			});
			sourse.push(res);
		});
		const workSheet = XLSX.utils.aoa_to_sheet(sourse);
		const workBoot = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workBoot, workSheet, '学生成绩导出');
		XLSX.writeFile(workBoot, 'score.xlsx');
	};

	const init = async () => {
		const id = user.userInfo.teacher?.clazzId;
		loading.value = true;
		if (id) {
			const student = await findStudentListById(id);
			studentList.value = student.map<Student>((item) => {
				return {
					...item,
					score: getStudentScore(item.scoreDtos),
				};
			});
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
		onExport,
	};
};

export default useScore;
