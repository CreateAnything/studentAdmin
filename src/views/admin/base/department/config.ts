import { FormItem } from '@/components/commmon/modelForm/form/type';
import { TableColumnsType } from 'ant-design-vue';

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
		title: '操作',
		key: 'action',
	},
].map((item) => ({
	...item,
	key: item.dataIndex || item.key,
	align: 'center',
}));

export const createModelConfig = (): FormItem[] => {
	const Config: FormItem[] = [
		{
			label: '姓名',
			key: 'name',
			type: 'input',
			inputType: 'text',
			placeholder: '请输入院系名称',
			rules: [
				{
					required: true,
					trigger: 'change',
					message: '请输入院系姓名',
				},
			],
			span: 6,
		},
	];
	return Config;
};
