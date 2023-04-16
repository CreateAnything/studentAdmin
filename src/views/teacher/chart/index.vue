<script setup lang="ts">
import Page from '@/components/commmon/page/index.vue';
import { useUserStore } from '@/store/user';
import { findStudentListById } from '@/views/teacher/student/score/request';
import { onMounted, ref } from 'vue';
import { ScoreDots } from '../student/score/type';
import Bar from './bar/index.vue';
import Pipe from './pipe/index.vue';
import Ring from './ring/index.vue';
import { ChartProps, LevelItem } from './type';
const user = useUserStore();
const courseId = user.userInfo.teacher?.courseId as string;
const id = user.userInfo.teacher?.clazzId;
const chartProps = ref<ChartProps[]>([]);
const passRate = ref<number>(0);
const loading = ref<boolean>(false);
const level: LevelItem[] = [
	{
		name: '优秀',
		min: 85,
		max: 100,
	},
	{
		name: '良好',
		min: 70,
		max: 85,
	},
	{
		name: '中等',
		min: 60,
		max: 70,
	},
	{
		name: '差等',
		min: 0,
		max: 60,
	},
];

const getStudentScore = (scores: ScoreDots[]): string | number => {
	if (scores && scores.length === 0) return 0;
	return (
		scores.find((course) => course.courseId === parseInt(courseId))
			?.score || 0
	);
};

const init = async () => {
	loading.value = true;
	const result = await findStudentListById(id);
	const score = result.map((item) => getStudentScore(item.scoreDtos));
	chartProps.value = level.map(({ name, max, min }) => {
		const count = score?.filter((n) => n >= min && n <= max).length;
		return {
			name,
			count,
			max,
			min,
			percentage: (count / result.length) * 100,
		};
	});
	const passNum = chartProps.value.find((item) => item.name === '差等');
	passRate.value = (result.length - passNum?.count) / 100;
	loading.value = false;
};

onMounted(() => {
	init();
});
</script>

<template>
	<Page :show-head="true" v-loading="loading">
		<template #head>
			<DescHead title="学生成绩统计">
				<template #body
					>统计学生成绩的模块可查看学生的分数等级统计</template
				>
			</DescHead>
		</template>
		<template #main>
			<div class="chart-wrapper">
				<div class="chart-col">
					<Pipe :sourse="chartProps" />
				</div>
				<div class="chart-col">
					<Bar :sourse="chartProps" />
				</div>
				<div class="chart-col">
					<Ring :sourse="passRate" />
				</div>
			</div>
		</template>
	</Page>
</template>
<style scoped lang="less">
.chart-wrapper {
	width: 100%;
	min-height: 320px;
	display: grid;
	gap: 20px;
	margin-top: 10px;
	grid-template-columns: repeat(3, calc(100% / 3));
	.chart-col {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
	}
}
</style>
