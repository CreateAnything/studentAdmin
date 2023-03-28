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
				title: '班级',
				dataIndex: 'clazzName',
			},
			{
				title: '班主任姓名',
				dataIndex: 'tname',
			},
			{
				title: '操作',
				key: 'action',
			},
		],
	};
};
