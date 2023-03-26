import { FormItem } from '@/components/commmon/modelForm/form/type';
import { ModeOptions } from 'global';
import { Roels } from '../user/type';

export const urlPattern = /^\/(admin|student|teacher)(\/.*)?$/;
export const createModelConfig = <T = string>({
	data,
	enventStack,
}: ModeOptions<T>): FormItem[] => {
	return [
		{
			label: '菜单名称',
			type: 'input',
			inputType: 'text',
			span: 8,
			key: 'name',
			placeholder: '请输入菜单名称',
			rules: [
				{
					required: true,
					trigger: 'change',
					message: '请输入菜单名称',
				},
				{
					pattern: /^[\u4e00-\u9fa5]{1,10}$/,
					trigger: 'change',
					message: '菜单名称必须为小于10位的中文',
				},
			],
		},
		{
			label: '跳转路径',
			type: 'input',
			inputType: 'text',
			span: 8,
			key: 'url',
			changeFn: enventStack['url'],
			placeholder: '请输入跳转路径',
			rules: [
				{
					required: true,
					trigger: 'change',
					message: '请输入菜单路径',
				},
				{
					pattern: urlPattern,
					trigger: 'change',
					message:
						'必须为(/admin | /student | /teacher)开头的path',
				},
			],
		},
		{
			label: '菜单key',
			type: 'input',
			inputType: 'text',
			disabled: true,
			span: 8,
			key: 'keyd',
			placeholder: '_xxx_xx',
		},
		{
			label: '菜单图标',
			type: 'input',
			inputType: 'text',
			span: 8,
			key: 'icon',
			placeholder: '请输入菜单图标',
		},
		{
			label: '菜单排序',
			type: 'input',
			inputType: 'text',
			span: 8,
			key: 'sort',
			placeholder: '请输入菜单排序值',
		},
		{
			label: '父级菜单',
			type: 'treeSelecter',
			span: 8,
			key: 'parentId',
			placeholder: '请输入父级菜单',
			showSearch: true,
			maxHeight: 400,
			fieldNames: {
				children: 'children',
				label: 'name',
				value: 'id',
			},
			treeData: data && data['menuTree'],
		},
		{
			label: '是否链接',
			type: 'switch',
			span: 8,
			key: 'isLink',
			checkedValue: 1,
			unCheckedValue: 0,
		},
		{
			label: '是否菜单',
			type: 'switch',
			span: 8,
			key: 'isMenu',
			checkedValue: 1,
			unCheckedValue: 0,
		},
		{
			label: '是否启用',
			type: 'switch',
			span: 8,
			key: 'enable',
			checkedValue: 1,
			unCheckedValue: 0,
		},
		{
			label: '菜单描述',
			type: 'input',
			inputType: 'area',
			labelCol: { span: 10 },
			span: 24,
			key: 'description',
			placeholder: '请输入菜单描述',
			rows: 4,
		},
	];
};

export const createTabConfig = (): { label: string; value: Roels }[] => {
	return [
		{
			label: '管理端',
			value: Roels.Admin,
		},
		{
			label: '教师端',
			value: Roels.Teacher,
		},
		{
			label: '学生端',
			value: Roels.Student,
		},
	];
};
