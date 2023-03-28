import { CreateTableConfig } from '@/components/commmon/table/type';
import { TableColumnProps } from 'ant-design-vue';
import { StudentItem } from './type';
export const createTableConfig: CreateTableConfig = () => {
	return {
		showAdd: true,
		addName: '打分',
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
				title: '课程',
				dataIndex: 'cname',
			},
			{
				title: '分数',
				dataIndex: 'score',
			},
			{
				title: '性别',
				dataIndex: 'sex',
			},
			{
				title: '生日',
				dataIndex: 'birthday',
			},
			{
				title: '部门',
				dataIndex: 'dname',
			},
		],
	};
};

export const ModelColums: TableColumnProps<StudentItem>[] = [
	{
		title: '序号',
		width: 100,
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
		title: '课程',
		dataIndex: 'cname',
	},
	{
		title: '操作',
		key: 'action',
		width: 300,
	},
].map((item) => ({
	...item,
	key: item.dataIndex || item.key,
	align: 'center',
}));
