export default {
	title: {
		show: true,
		text: '成绩等级比例统计',
		padding: [10, 10, 5, 20],
		textStyle: {
			color: '#000',
			fontWeight: 'bold',
			fontSize: 15,
		},
	},
	color: ['#8378ea', '#9fe6b8', '#ffdb5c', '#007175'],
	backgroundColor: '#fff',

	tooltip: {
		formatter: '{b}：{c}%',
	},

	legend: {
		top: '8%',
	},
	grid: {
		top: '0',
		left: '0',
	},
	series: [
		{
			name: '',
			type: 'pie',
			radius: ['40%', '70%'],
			center: ['50%', '58%'],
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)',
				},
			},
			label: {
				normal: {
					show: true,
				},
			},
		},
	],
};
