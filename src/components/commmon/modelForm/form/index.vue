<script setup lang="ts">
import { FormInstance } from 'ant-design-vue';
import { FormState } from 'global';
import { reactive, ref, toRefs, watch } from 'vue';
import { FormConfig, FormExpose, FormItem } from './type';

interface Props {
	state: FormState;
	config: FormItem[];
	formConfig?: FormConfig;
}
const props = withDefaults(defineProps<Props>(), {
	formConfig: () => ({
		labelCol: { span: 7 },
		wrappercol: { span: 24 },
	}),
});
const emit = defineEmits<{
	(e: 'update:state', value: FormState): void;
}>();

const { config, formConfig, state } = toRefs(props);
let stateForm = reactive<FormState>({ ...state.value });
const formRef = ref<FormInstance>();

const resetFields = () => {
	formRef.value?.resetFields();
};
const validateForm = (callback: () => void) => {
	formRef.value?.validate().then(() => {
		callback();
	});
};

defineExpose<FormExpose>({
	resetFields,
	validateForm,
});

watch(
	stateForm,
	(newValue: FormState) => {
		emit('update:state', newValue);
	},
	{ deep: true, immediate: true }
);
</script>

<template>
	<div>
		<a-form
			:label-col="formConfig.labelCol"
			:wrapper-col="formConfig.wrappercol"
			:model="stateForm"
			ref="formRef"
		>
			<a-row :gutter="[16, 16]">
				<a-col
					v-for="item in config"
					:key="item.key"
					:span="item.span"
				>
					<a-form-item
						v-if="item.type === 'input'"
						:label="item.label"
						:name="item.key"
						:rules="item.rules"
					>
						<a-input
							:type="item.inputType"
							:placeholder="item.placeholder"
							v-model:value="stateForm[item.key]"
						/>
					</a-form-item>
					<a-form-item
						v-if="item.type === 'select'"
						:label="item.label"
						:name="item.key"
						:rules="item.rules"
					>
						<a-select
							:placeholder="item.placeholder"
							v-model:value="stateForm[item.key]"
							:options="item.options"
							class="full-width"
						>
						</a-select>
					</a-form-item>
					<a-form-item
						v-if="item.type === 'datepicker'"
						:label="item.label"
						:name="item.key"
						:placeholder="item.placeholder"
						:rules="item.rules"
					>
						<a-date-picker
							class="full-width"
							v-model:value="stateForm[item.key]"
							:format="item.format"
							:placeholder="item.placeholder"
							:picker="item.picker"
							:allow-clear="item.allowClear"
							:value-format="item.valueFormat"
						/>
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
	</div>
</template>
