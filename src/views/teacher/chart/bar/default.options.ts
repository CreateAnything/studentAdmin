import * as echarts from 'echarts';
export default {
	backgroundColor: '#fff',
	title: {
		show: true,
		text: '成绩等级个数统计',
		padding: [10, 10, 5, 20],
		textStyle: {
			color: '#000',
			fontWeight: 'bold',
			fontSize: 15,
		},
	},
	grid: {
		top: '15%',
		right: '10%',
		left: '10%',
		bottom: '12%',
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		},
	},
	xAxis: [
		{
			type: 'category',
			color: '#000',
			axisLabel: {
				color: '#000',
				textStyle: {
					fontSize: 12,
				},
			},
			axisLine: {
				lineStyle: {
					color: 'rgba(107,107,107,0.37)',
				},
			},
			axisTick: {
				show: false,
			},
		},
	],
	yAxis: [
		{
			axisLabel: {
				formatter: '{value}',
				color: '#000',
				textStyle: {
					fontSize: 12,
				},
			},
			axisLine: {
				lineStyle: {
					color: 'rgba(107,107,107,0.37)',
				},
			},
			axisTick: {
				show: false,
			},
			splitLine: {
				lineStyle: {
					color: 'rgba(131,101,101,0.2)',
					type: 'dashed',
				},
			},
		},
	],
	series: [
		{
			type: 'bar',
			barWidth: '20px',
			itemStyle: {
				color: function (params: { value: number }) {
					//展示正值的柱子，负数设为透明
					const colorArr =
						params.value > 0
							? ['#FF9A22', '#FFD56E']
							: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)'];
					return new echarts.graphic.LinearGradient(
						0,
						0,
						0,
						1,
						[
							{
								offset: 0,
								color: colorArr[0], // 0% 处的颜色
							},
							{
								offset: 1,
								color: colorArr[1], // 100% 处的颜色
							},
						],
						false
					);
				},
				borderRadius: [30, 30, 0, 0],
			},
			label: {
				show: true,
				fontSize: 12,
				fontWeight: 'bold',
				color: '#000',
				position: 'top',
			},
		},
	],
};
