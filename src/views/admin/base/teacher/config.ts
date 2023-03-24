import { FormItem } from '@/components/commmon/modelForm/form/type';
import { TableColumnsType } from 'ant-design-vue';
import { ClassItem } from '../class/type';

export const Colums: TableColumnsType = [
	{
		title: '序号',
		customRender: (text: { index: number }) => {
			return text.index + 1;
		},
	},
	{
		title: '姓名',
		dataIndex: 'name',
	},
	{
		title: '班级',
		dataIndex: 'clazzName',
	},
	{
		title: '院系',
		dataIndex: 'dname',
	},
	{
		title: '所教院系',
		dataIndex: 'fname',
	},
	{
		title: '性别',
		dataIndex: 'sex',
	},
	{
		title: '操作',
		key: 'action',
	},
].map((item) => ({
	...item,
	key: item.dataIndex || item.key,
	align: 'center',
}));

export const createModelConfig = (classList: ClassItem[]): FormItem[] => {
	const Config: FormItem[] = [
		{
			label: '姓名',
			key: 'name',
			type: 'input',
			inputType: 'text',
			placeholder: '请输入教师姓名',
			span: 6,
		},
		{
			label: '生日',
			key: 'birthday',
			type: 'datepicker',
			picker: 'date',
			placeholder: '请选择教师生日',
			span: 6,
		},
		{
			label: '性别',
			key: 'sex',
			type: 'select',
			span: 6,
			options: [
				{
					label: '男',
					value: '男',
				},
				{
					label: '女',
					value: '女',
				},
			],
		},
		{
			label: '班级',
			key: 'departmentId',
			span: 6,
			type: 'select',
			placeholder: '请选择班级',
			options: classList.map((item) => ({
				label: item.clazzName,
				value: item.id,
			})),
		},
	];
	console.log(classList);

	return Config;
};
