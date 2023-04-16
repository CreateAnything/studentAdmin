import { FormItem } from '@/components/commmon/modelForm/type';
import { Rule } from 'ant-design-vue';
import { RouteRecordRaw } from 'vue-router';

declare type FormState = {
	[index: string]: any;
};

declare type ValidatorsType<T, K extends keyof T> = Record<
	K,
	ValidatorRules
>;

declare type EnentStack<T, K extends keyof T> = Record<
	K,
	(...args: any[]) => void
>;

declare type RouterRow = RouteRecordRaw;
declare type TableColums = TableColumnsType;
declare type ValidatorRules = (
	rule: Rule,
	value: string
) => Promise<void> | void;

declare interface ModeOptions<T = string> {
	data?: Record<string, any>;
	enventStack?: EnentStack<T>;
	validator?: ValidatorsType<T>;
}

declare type CreateModelFn = <T = string>(
	options?: ModeOptions<T>
) => FormItem[];
