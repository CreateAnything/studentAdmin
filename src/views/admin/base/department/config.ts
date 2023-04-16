import { FormItem } from '@/components/commmon/modelForm/type';
import { CreateTableConfig } from '@/components/commmon/table/type';
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
				title: '姓名',
				dataIndex: 'name',
			},
			{
				title: '操作',
				key: 'action',
			},
		],
	};
};

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
