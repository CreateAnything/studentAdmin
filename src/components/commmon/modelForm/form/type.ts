import { SelectProps } from 'ant-design-vue';
import { Rule } from 'ant-design-vue/lib/form';

// type FormType = 'input' | 'select' | 'datepicker' | 'treeselecte';
type InputType = 'text' | 'area' | 'password';
type PickerType = 'date' | 'week' | 'month' | 'quarter' | 'year';
interface FormItemType {
	labelAlign?: 'left' | 'right';
	rules?: Rule[];
}
type BaseConfig = {
	placeholder?: string;
	key: string;
	label: string;
	span: number;
} & FormItemType;

type InputConfig = {
	type: 'input';
	inputType: InputType;
	showCount?: boolean;
	disabled?: false;
} & BaseConfig;

type SelectConfig = {
	type: 'select';
	options: SelectProps['options'];
	allowClear?: boolean;
	disabled?: boolean;
} & BaseConfig;

type DatePickerConfig = {
	type: 'datepicker';
	allowClear?: boolean;
	format?: string;
	picker: PickerType;
	valueFormat?: string;
} & BaseConfig;

type FormItem = InputConfig | SelectConfig | DatePickerConfig;

//form的配置
type FormConfig = {
	name?: string;
	labelCol?: { span: number; offset?: number };
	labelWrap?: boolean;
	wrappercol?: { span: number; offset?: number };
	autocomplete?: string;
};
type FormExpose = {
	resetFields: () => void;
	validateForm: (success: () => void) => void;
};

type ModelExpose = {
	openModel: (type: boolean, payload?: any) => void;
};
export type { FormConfig, FormExpose, FormItem, ModelExpose };