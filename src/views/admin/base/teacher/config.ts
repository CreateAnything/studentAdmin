import { FormItem } from '@/components/commmon/modelForm/form/type';
import { CreateTableConfig } from '@/components/commmon/table/type';
import { ClassItem } from '../class/type';
import { CourseItem } from '../course/type';
import { DeparmentItem } from '../department/type';
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
				title: '班级',
				dataIndex: 'clazzName',
			},
			{
				title: '院系',
				dataIndex: 'dname',
			},
			{
				title: '课程',
				dataIndex: 'cname',
			},
			{
				title: '生日',
				dataIndex: 'birthday',
			},
			{
				title: '性别',
				dataIndex: 'sex',
			},
			{
				title: '操作',
				key: 'action',
			},
		],
	};
};

export const createModelConfig = (
	classList: ClassItem[],
	departmentList: DeparmentItem[],
	courseList: CourseItem[]
): FormItem[] => {
	const Config: FormItem[] = [
		{
			label: '姓名',
			key: 'name',
			type: 'input',
			inputType: 'text',
			placeholder: '请输入教师姓名',
			rules: [
				{
					required: true,
					trigger: 'change',
					message: '请输入教师姓名',
				},
			],
			span: 6,
		},
		{
			label: '生日',
			key: 'birthday',
			type: 'datepicker',
			picker: 'date',
			format: 'YYYY-MM-DD',
			valueFormat: 'YYYY-MM-DD',
			placeholder: '请选择教师生日',
			rules: [
				{
					required: true,
					trigger: 'change',
					message: '请选择教师生日',
				},
			],
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
			key: 'clazzId',
			span: 6,
			type: 'select',
			placeholder: '请选择班级',
			rules: [
				{
					required: true,
					trigger: 'change',
					message: '请选择教师管理的班级',
				},
			],
			options: classList.map((item) => ({
				label: item.clazzName,
				value: item.id,
			})),
		},
		{
			label: '课程',
			key: 'courseId',
			span: 6,
			type: 'select',
			placeholder: '请选择课程',
			rules: [
				{
					required: true,
					trigger: 'change',
					message: '请选择课程',
				},
			],
			options: courseList.map((item) => ({
				label: item.name,
				value: item.id,
			})),
		},
		{
			label: '院系',
			key: 'departmentId',
			span: 6,
			type: 'select',
			placeholder: '请选择院系',
			rules: [
				{
					required: true,
					trigger: 'change',
					message: '请选择教师所在的院系',
				},
			],
			options: departmentList.map((item) => ({
				label: item.name,
				value: item.id,
			})),
		},
	];
	return Config;
};
