<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, onUnmounted, ref } from 'vue';
import defaultOptions from './default.options';
interface Props {
	sourse: number;
}
const props = defineProps<Props>();
const pipChartRef = ref<HTMLDivElement>();
const Instance = ref<echarts.ECharts>();

const initChart = () => {
	Instance.value = echarts.init(pipChartRef.value);
	Instance.value.setOption(defaultOptions);
	loadAsyncOptions();
	window.addEventListener('resize', handleResize);
};

const loadAsyncOptions = () => {
	const options = {
		series: [
			{
				axisLine: {
					lineStyle: {
						color: [
							[props.sourse / 100, '#468EFD'],
							[1, '#111F42'],
						],
						width: 8,
					},
				},
				data: [
					{
						name: props.sourse,
						value: props.sourse,
					},
				],
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
