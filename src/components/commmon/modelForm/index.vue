<script setup lang="ts">
import { FormInstance } from 'ant-design-vue';
import { FormState } from 'global';
import { computed, ref, toRefs, watch } from 'vue';
import { FormConfig, FormItem, ModelExpose } from './form/type';
interface Props {
	width?: number;
	config: FormItem[];
	formConfig?: FormConfig;
	state: FormState;
}
const props = withDefaults(defineProps<Props>(), {
	width: 1000,
	formConfig: () => ({
		labelCol: { span: 7 },
		wrappercol: { span: 24 },
	}),
});
const emit = defineEmits<{
	(e: 'update:state', value: FormState): void;
	(e: 'submit', payload: any): void;
	(e: 'cancel'): void;
}>();
const { width, state, config, formConfig } = toRefs(props);
const visible = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const modelFormRef = ref<FormInstance>();
const stateForm = ref<FormState>({ ...state.value });
const formatTitle = computed(() => {
	return isEdit.value ? '编辑' : '新增';
});

const onClose = () => {
	modelFormRef.value?.resetFields();
	visible.value = false;
};

const oncancel = () => {
	onClose();
	emit('cancel');
};

const onSubmit = () => {
	modelFormRef.value?.validate().then(() => {
		emit('submit', stateForm.value);
		onClose();
	});
};

const openModel = (type: boolean, payload: any) => {
	visible.value = true;
	payload && (stateForm.value = { ...payload });
	isEdit.value = type;
};
watch(
	stateForm,
	(newValue: FormState) => {
		emit('update:state', newValue);
	},
	{ deep: true, immediate: true }
);

defineExpose<ModelExpose>({
	openModel,
});
</script>
<template>
	<a-modal
		v-model:visible="visible"
		:title="formatTitle"
		:style="{ width: width + 'px' }"
		@cancel="oncancel"
		@ok="onSubmit"
	>
		<a-form
			ref="modelFormRef"
			:label-col="formConfig?.labelCol"
			:wrapper-col="formConfig.wrappercol"
			:model="stateForm"
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
	</a-modal>
</template>
