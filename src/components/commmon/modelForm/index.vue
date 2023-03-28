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
	title?: string;
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
const { width, state, config, formConfig, title } = toRefs(props);
const visible = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const modelFormRef = ref<FormInstance>();
const stateForm = ref<FormState>({ ...state.value });
const resetForm = ref<FormState>({ ...state.value });
const formatTitle = computed(() => {
	if (title?.value) {
		return title.value;
	}
	return isEdit.value ? '编辑' : '新增';
});

const onClose = () => {
	stateForm.value = { ...resetForm.value };
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
						<a-input-password
							v-if="item.inputType === 'password'"
							:placeholder="item.placeholder"
							v-model:value="stateForm[item.key]"
						></a-input-password>
						<a-textarea
							v-else-if="item.inputType === 'area'"
							:placeholder="item.placeholder"
							v-model:value="stateForm[item.key]"
							:rows="item.rows"
						></a-textarea>
						<a-input
							v-else
							:type="item.inputType"
							:placeholder="item.placeholder"
							:disabled="item.disabled"
							v-model:value="stateForm[item.key]"
							:addon-before="item?.addBefore"
							@change="item.changeFn"
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
						v-if="item.type === 'treeSelecter'"
						:label="item.label"
						:name="item.key"
						:rules="item.rules"
					>
						<a-tree-select
							v-model:value="stateForm[item.key]"
							:show-search="item.showSearch"
							style="width: 100%"
							:placeholder="item.placeholder"
							:dropdown-style="{
								maxHeight: item.maxHeight + 'px',
							}"
							allow-clear
							:tree-default-expand-all="item?.treeExpendAll"
							:tree-data="item.treeData"
							:field-names="item.fieldNames"
						>
						</a-tree-select>
					</a-form-item>
					<a-form-item
						v-if="item.type === 'switch'"
						:label="item.label"
						:name="item.key"
						:rules="item.rules"
					>
						<a-switch
							:checked-value="item.checkedValue"
							:un-checked-value="item.unCheckedValue"
							v-model:checked="stateForm[item.key]"
						/>
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
					<a-form-item
						v-if="item.type === 'timePicker'"
						:label="item.label"
						:name="item.key"
						:placeholder="item.placeholder"
						:rules="item.rules"
					>
						<a-time-picker
							class="full-width"
							v-if="item.pickerType === 'timePicker'"
							:allow-clear="item?.allowClear"
							:format="item?.format"
							:value-format="item?.valueFormat"
							v-model:value="stateForm[item.key]"
						/>
						<a-time-range-picker
							class="full-width"
							v-if="item.pickerType === 'timeRangePicker'"
							:allow-clear="item?.allowClear"
							:format="item?.format"
							:value-format="item?.valueFormat"
							v-model:value="stateForm[item.key]"
						/>
					</a-form-item>
					<a-form-item
						v-if="item.type === 'cascader'"
						:label="item.label"
						:name="item.key"
						:rules="item.rules"
					>
						<a-cascader
							v-model:value="stateForm[item.key]"
							:options="item.options"
							:placeholder="item?.placeholder"
							:expand-trigger="item?.expandTrigger"
						/>
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
	</a-modal>
</template>
