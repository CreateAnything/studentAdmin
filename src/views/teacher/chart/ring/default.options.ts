export default {
	backgroundColor: '#fff',
	tooltip: {
		show: false,
	},
	title: {
		show: true,
		text: '成绩及格率统计',
		padding: [10, 10, 5, 20],
		textStyle: {
			color: '#000',
			fontWeight: 'bold',
			fontSize: 15,
		},
	},
	series: [
		{
			name: '内部进度条',
			type: 'gauge',
			radius: '40%',
			splitNumber: 10,
			axisLabel: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			splitLine: {
				show: false,
			},
			itemStyle: {
				show: false,
			},
			detail: {
				formatter: function () {
					return '及格率';
				},
				offsetCenter: [0, 130],
				textStyle: {
					padding: [0, 0, 0, 0],
					fontSize: 20,
					fontWeight: '700',
					color: '#324063',
				},
			},
			title: {
				//标题
				show: true,
				offsetCenter: [0, 90], // x, y，单位px
				textStyle: {
					color: '#2D99FF',
					fontSize: 40, //表盘上的标题文字大小
					fontWeight: 700,
					fontFamily: 'PingFangSC',
				},
			},
			pointer: {
				show: true,
				length: '75%',
				radius: '30%',
				width: 10, //指针粗细
			},
			animationDuration: 2000,
		},
		{
			name: '外部刻度',
			type: 'gauge',
			radius: '80%',
			min: 0,
			max: 100,
			splitNumber: 10, //刻度数量
			startAngle: 225,
			endAngle: -45,
			axisLine: {
				show: true,
				lineStyle: {
					width: 1,
					color: [[1, 'rgba(0,0,0,0)']],
				},
			}, //仪表盘轴线
			axisLabel: {
				show: true,
				color: '#4d5bd1',
				distance: 25,
				formatter: function (v: number) {
					switch (v + '') {
						case '0':
							return '0';
						case '10':
							return '10';
						case '20':
							return '20';
						case '30':
							return '30';
						case '40':
							return '40';
						case '50':
							return '50';
						case '60':
							return '60';
						case '70':
							return '70';
						case '80':
							return '80';
						case '90':
							return '90';
						case '100':
							return '100';
					}
				},
			}, //刻度标签。
			axisTick: {
				show: true,
				splitNumber: 7,
				lineStyle: {
					color: '#468EFD', //用颜色渐变函数不起作用
					width: 1,
				},
				length: -8,
			}, //刻度样式
			splitLine: {
				show: true,
				length: -20,
				lineStyle: {
					color: '#468EFD', //用颜色渐变函数不起作用
				},
			}, //分隔线样式
			detail: {
				show: false,
			},
			pointer: {
				show: false,
			},
		},
	],
};
