import { CreateModelFn } from 'type';

export const createModelConfig: CreateModelFn = (options) => {
	return [
		{
			type: 'input',
			inputType: 'password',
			span: 6,
			key: 'password',
			placeholder: '请输入原密码',
			label: '原密码',
			rules: [
				{
					required: true,
					trigger: 'change',
					message: '请输入原密码',
				},
			],
		},
		{
			type: 'input',
			inputType: 'password',
			span: 6,
			key: 'newPassword',
			placeholder: '请输入密码',
			label: '密码',
			rules: [
				{
					required: true,
					trigger: 'change',
					message: '请输入密码',
				},
			],
		},
		{
			type: 'input',
			inputType: 'password',
			span: 8,
			key: 'confirmPassword',
			placeholder: '请确认原密码',
			label: '确认密码',
			rules: [
				{
					validator: options?.validator['confirmPassword'],
					trigger: 'change',
				},
			],
		},
	];
};
export const createPersonModelConfig: CreateModelFn = () => {
	return [
		{
			type: 'select',
			label: '性别',
			span: 6,
			key: 'sex',
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
			type: 'datepicker',
			label: '生日',
			span: 6,
			picker: 'date',
			key: 'birthday',
			format: 'YYYY-MM-DD',
			valueFormat: 'YYYY-MM-DD',
		},
	];
};
