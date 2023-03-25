import { FormItem } from '@/components/commmon/modelForm/form/type';
import { TableColumnsType } from 'ant-design-vue';

export const createTableColums = (): TableColumnsType => {
	return [
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
			title: '操作',
			key: 'action',
		},
	];
};

export const createModelConfig = (): FormItem[] => {
	return [
		{
			type: 'input',
			inputType: 'text',
			label: '名称',
			span: 6,
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
	];
};
