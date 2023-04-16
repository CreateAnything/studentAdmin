import { FormItem } from '@/components/commmon/modelForm/type';
import { CreateTableConfig } from '@/components/commmon/table/type';
import { CreateModelFn } from 'type';
const WeekObj = {
	1: '星期一',
	2: '星期二',
	3: '星期三',
	4: '星期四',
	5: '星期五',
	6: '星期六',
	7: '星期天',
};
type WeekKey = keyof typeof WeekObj;
type AddressOpt = {
	value: string;
	label: string;
	children?: AddressOpt[];
};
export const createTableConfig: CreateTableConfig = () => {
	return {
		showAdd: true,
		colums: [
			{
				title: '序号',
				customRender: (text: { index: number }) => {
					return text.index + 1;
				},
			},
			{
				title: '课程名称',
				dataIndex: 'name',
				key: 'name',
				align: 'center',
			},
			{
				title: '课程时间',
				dataIndex: 'classTime',
				key: 'classTime',
				align: 'center',
			},
			{
				title: '星期',
				dataIndex: 'week',
				key: 'week',
				align: 'center',
				customRender: (row) => {
					const index: keyof typeof WeekObj = row.value;
					return WeekObj[index];
				},
			},
			{
				title: '节数',
				dataIndex: 'section',
				key: 'section',
				align: 'center',
			},
			{
				title: '教师',
				dataIndex: 'tname',
				key: 'tname',
				align: 'center',
			},
			{
				title: '地点',
				dataIndex: 'address',
				key: 'address',
				align: 'center',
			},
			{
				title: '操作',
				key: 'action',
			},
		],
	};
};

export function createTreeAdress(
	level: number,
	rootNum: 5
): AddressOpt[] {
	const result: AddressOpt[] = [];
	const getChildren = (num: number): AddressOpt[] => {
		const res: AddressOpt[] = [];
		for (let i = 1; i <= rootNum; i++) {
			res[i - 1] = {
				label: `${num}-${i}教室`,
				value: `${num}-${i}教室`,
			};
		}
		return res;
	};
	for (let i = 1; i <= level; i++) {
		result[i - 1] = {
			label: `${i}号教学楼`,
			value: `${i}号教学楼`,
			children: getChildren(i),
		};
	}
	return result;
}
export const createModelConfig: CreateModelFn = (modeOpt): FormItem[] => {
	return [
		{
			type: 'input',
			inputType: 'text',
			label: '名称',
			span: 8,
			key: 'name',
			placeholder: '请输入课程名称',
			rules: [
				{
					required: true,
					trigger: 'change',
					message: '请输入课程名称',
				},
			],
		},
		{
			type: 'timePicker',
			pickerType: 'timePicker',
			valueFormat: 'h:mm',
			format: 'h:mm',
			span: 8,
			key: 'classTime',
			label: '课程时间',
		},
		{
			type: 'select',
			span: 8,
			key: 'week',
			label: '星期',
			options: [1, 2, 3, 4, 5, 6, 7].map((item) => {
				const key = item as WeekKey;
				return {
					label: WeekObj[key],
					value: key,
				};
			}),
		},
		{
			type: 'select',
			span: 8,
			key: 'section',
			label: '节数',
			options: [1, 2, 3, 4, 5].map((item) => ({
				label: `${item}节`,
				value: item,
			})),
		},
		{
			type: 'cascader',
			label: '教室',
			span: 8,
			key: 'address',
			placeholder: '请选择教室',
			options: createTreeAdress(5, 5),
			expandTrigger: 'hover',
		},
		{
			type: 'select',
			label: '教师',
			key: 'teacherId',
			placeholder: '请选择上课老师',
			span: 8,
			options:
				modeOpt?.data &&
				modeOpt?.data['teacherId'].map((item: any) => ({
					label: item.name,
					value: item.id,
				})),
		},
	];
};
