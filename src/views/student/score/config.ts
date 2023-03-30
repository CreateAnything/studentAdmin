import {
	CreateTableConfig,
	TableConfig,
} from '@/components/commmon/table/type';
export const createTableConfig: CreateTableConfig = (): TableConfig => {
	return {
		showAdd: false,
		colums: [
			{
				title: '序号',
				customRender: (text: { index: number }) => {
					return text.index + 1;
				},
				align: 'center',
			},
			{
				title: '课程名称',
				dataIndex: 'cname',
			},
			{
				title: '成绩',
				dataIndex: 'score',
			},
		],
	};
};
