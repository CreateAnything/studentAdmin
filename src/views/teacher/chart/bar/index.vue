<script lang="ts" setup>
import * as echarts from 'echarts';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { ChartProps } from '../type';
import defaultOptions from './default.options';
interface Props {
	sourse: ChartProps[];
}
const props = defineProps<Props>();

const pipChartRef = ref<HTMLDivElement>();
const Instance = ref<echarts.ECharts>();

const getNames = computed(() => {
	return props.sourse.map((item) => item.name);
});
const getDatas = computed(() => {
	return props.sourse.map((item) => item.count);
});
const initChart = () => {
	Instance.value = echarts.init(pipChartRef.value);
	Instance.value.setOption(defaultOptions);
	setSeries();
	window.addEventListener('resize', handleResize);
};

const setSeries = () => {
	const options = {
		xAxis: [
			{
				data: getNames.value,
			},
		],
		series: [
			{
				data: getDatas.value,
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
