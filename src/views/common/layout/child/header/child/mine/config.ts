import { FormItem } from '@/components/commmon/modelForm/form/type';

export const createModelConfig = (): FormItem[] => {
	return [
		{
			type: 'input',
			inputType: 'password',
			span: 6,
			key: 'beforePassword',
			placeholder: '请输入原密码',
			label: '原密码',
		},
		{
			type: 'input',
			inputType: 'password',
			span: 6,
			key: 'password',
			placeholder: '请输入密码',
			label: '密码',
		},
		{
			type: 'input',
			inputType: 'password',
			span: 6,
			key: 'confirmPassword',
			placeholder: '请确认原密码',
			label: '确认密码',
		},
	];
};
