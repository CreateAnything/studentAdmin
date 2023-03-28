import { TableProps } from 'ant-design-vue';
import { ButtonProps } from 'ant-design-vue/es';

export interface TableAction {
	name: string;
	type: ButtonProps['type'] & 'confirm';
	btnSize: ButtonProps['size'];
	fn: (payload: any) => void;
}
export interface TableConfig {
	title?: string;
	colums: TableProps['columns'];
	showAdd?: boolean;
	size?: TableProps['size'];
	addName?: string;
	bordered?: boolean;
	pageSize?: number;
	pagination?: TableProps['pagination'];
}
export type TableOptions<T> = {
	enentStack?: Record<keyof T, (...args: []) => void>;
};
export type CreateTableConfig = <T = any>(
	options?: TableOptions<T>
) => TableConfig;
