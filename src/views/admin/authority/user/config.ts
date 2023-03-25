import { FormItem } from '@/components/commmon/modelForm/form/type';
import { TableColumnsType } from 'ant-design-vue';
import { ModelOptions, Roels } from './type';
export const createColums = (): TableColumnsType => {
	return [
		{
			title: '序号',
			customRender: (text: { index: number }) => {
				return text.index + 1;
			},
		},
		{
			title: '姓名',
			dataIndex: 'username',
		},
		{
			title: '是否启用',
			dataIndex: 'isEnabled',
		},
		{
			title: '角色',
			dataIndex: 'roleId',
		},
		{
			title: '创建人',
			dataIndex: 'createUser',
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
};

export const createModelConfig = (options: ModelOptions): FormItem[] => {
	const { validator } = options;
	const result: FormItem[] = [
		{
			type: 'input',
			label: '姓名',
			inputType: 'text',
			span: 6,
			key: 'username',
			placeholder: '请输入用户名称',
			rules: [
				{
					required: true,
					trigger: 'change',
					message: '请输入用户姓名',
				},
			],
		},
		{
			type: 'input',
			label: '密码',
			inputType: 'password',
			span: 6,
			key: 'password',
			placeholder: '请输入用户的密码',
			rules: [
				{
					required: true,
					trigger: 'change',
					message: '请输入用户密码',
				},
			],
		},
		{
			type: 'input',
			label: '确认密码',
			inputType: 'password',
			span: 6,
			key: 'confirmPassword',
			placeholder: '请确认用户的密码',
			rules: [
				{
					validator: validator && validator['confirmPassword'],
					trigger: 'change',
					message: '两次密码不一致',
				},
			],
		},
		{
			type: 'select',
			label: '角色',
			span: 6,
			key: 'roleId',
			placeholder: '请选择角色',
			options: [
				{
					label: '学生',
					value: Roels.Student,
				},
				{
					label: '教师',
					value: Roels.Teacher,
				},
				{
					label: '管理员',
					value: Roels.Admin,
				},
			],
		},
		{
			type: 'switch',
			label: '是否启用',
			span: 6,
			key: 'isEnabled',
			checkedValue: 1,
			unCheckedValue: 0,
		},
	];
	return result;
};
