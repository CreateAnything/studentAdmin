type Picker = 'week' | 'month' | 'quarter' | 'year' | 'date';
type InputType = 'text' | 'area' | 'password';
type SearchFieldBase = {
	modekey: string;
	label: string;
	span: number;
	placeholder: string;
};

type InputSearchField = SearchFieldBase & {
	type: 'input';
	change?: (value: Event) => void;
	inputType: InputType;
};

type SelectSearchField = SearchFieldBase & {
	type: 'select';
	data: SelectOption[];
	defaultSelect: unknown;
	select: (value: unknown) => void;
};

type DatepickerSearchField = SearchFieldBase & {
	type: 'datepicker';
	format?: boolean;
	picker: Picker;
};

type DateSearchField = SearchFieldBase & {
	type: 'date';
	format?: boolean;
};

type SearchField =
	| InputSearchField
	| SelectSearchField
	| DatepickerSearchField
	| DateSearchField;

//其他配置项
type CardBaseConfig = {
	title?: string;
	loading?: boolean;
	descModel?: boolean;
};
type CardMode = CardBaseConfig & {
	modelValue: FormState;
};
type DescMode = CardBaseConfig & {
	desc: string;
};

export type ModeConfig = CardMode | DescMode;
export type SelectOption = {
	title: string;
	value: unknown;
};
export type SearchConfig = SearchField;
export type FormState = Record<string, unknown>;
