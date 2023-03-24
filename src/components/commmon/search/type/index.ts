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
	format?: string;
	picker: Picker;
};

type DateSearchField = SearchFieldBase & {
	type: 'date';
	format?: string;
};

type SearchField =
	| InputSearchField
	| SelectSearchField
	| DatepickerSearchField
	| DateSearchField;

export type SelectOption = {
	title: string;
	value: any;
};
export type SearchConfig = SearchField;
