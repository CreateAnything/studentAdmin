<script lang="ts" setup>
import * as echarts from 'echarts';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { ChartProps } from '../type';
import defaultOptions from './default.option';
interface Props {
	sourse: ChartProps[];
}
const props = defineProps<Props>();

const pipChartRef = ref<HTMLDivElement>();
const Instance = ref<echarts.ECharts>();

const getData = computed(() => {
	return props.sourse.map(({ name, percentage }) => ({
		name,
		value: percentage,
	}));
});
const getName = computed(() => {
	return props.sourse.map((it) => it.name);
});
const initChart = () => {
	Instance.value = echarts.init(pipChartRef.value);
	const options = defaultOptions;
	Instance.value.setOption(options);
	loadAsyncOptions();
	window.addEventListener('resize', handleResize);
};
const loadAsyncOptions = () => {
	const options = {
		legend: {
			top: '8%',
			data: getName.value,
		},
		series: [
			{
				data: getData.value,
			},
		],
	};
	Instance.value?.setOption(options);
};
const handleResize = () => {
	Instance.value?.resize();
};
onMounted(() => {
	setTimeout(() => {
		initChart();
	}, 500);
});
onUnmounted(() => {
	window.removeEventListener('reset', handleResize);
});
</script>
<template>
	<div id="pip-container">
		<div ref="pipChartRef" id="pip-chart"></div>
	</div>
</template>
<style scoped lang="less">
#pip-container {
	width: 100%;
	height: 100%;
	#pip-chart {
		height: 100%;
		width: 100%;
	}
}
</style>
