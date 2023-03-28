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
				title: '班级',
				dataIndex: 'clazzName',
			},
			{
				title: '部门',
				dataIndex: 'dname',
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
				title: '操作',
				key: 'action',
			},
		],
	};
};
