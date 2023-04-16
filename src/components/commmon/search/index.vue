<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue';
import { FormState } from 'type';
import { ref, toRefs, watch } from 'vue';
import { SearchConfig } from './type';
interface Props {
	title?: string;
	conifg: SearchConfig[];
	modelValue: FormState;
	loading?: boolean;
	descModel?: boolean;
}
interface Emit {
	(e: 'update:modelValue', value: FormState): void;
	(e: 'search'): void;
	(e: 'reset'): void;
}
const emit = defineEmits<Emit>();
const props = withDefaults(defineProps<Props>(), {
	title: '',
	loading: false,
	descModel: false,
});
const { title, conifg, modelValue, loading, descModel } = toRefs(props);

const formState = ref<FormState>({ ...modelValue.value });
const formInstance = ref<FormInstance>();

const onSearch = () => {
	emit('search');
};
const onReset = () => {
	formInstance.value?.resetFields();
	emit('reset');
};
watch(
	formState,
	(newValue: FormState) => {
		emit('update:modelValue', newValue);
	},
	{ deep: true }
);
</script>

<template>
	<a-card
		:title="title"
		:loading="loading"
		size="small"
		v-if="!descModel"
	>
		<a-form :model="formState" ref="formInstance">
			<a-row :gutter="[16, 16]" type="flex" align="middle">
				<a-col
					v-for="item in conifg"
					:key="item.modekey"
					:span="item.span"
				>
					<a-form-item
						v-if="item.type === 'input'"
						:label="item.label"
						:name="item.modekey"
					>
						<a-input
							:type="item.inputType"
							:placeholder="item.placeholder"
							@change="item.change"
							v-model:value="formState[item.modekey]"
						/>
					</a-form-item>
					<a-form-item
						:label="item.label"
						:name="item.modekey"
						v-else-if="item.type === 'select'"
					>
						<a-select
							:placeholder="item.placeholder"
							v-model:value="formState[item.modekey]"
							@select="item.select"
							v-if="item.data && item.data.length > 0"
						>
							<a-select-option
								v-for="sitem in item.data"
								:key="sitem.value"
							>
								{{ sitem.title }}
							</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item
						:name="item.modekey"
						:label="item.label"
						v-else-if="item.type === 'date'"
					>
						<a-range-picker
							class="full-width"
							v-model:value="formState[item.modekey]"
							:format="item.format"
						>
						</a-range-picker>
					</a-form-item>
					<a-form-item
						v-else-if="(item.type = 'datepicker')"
						:label="item.label"
						:name="item.modekey"
					>
						<a-date-picker
							class="full-width"
							v-model:value="formState[item.modekey]"
							:format="item.format"
							:placeholder="item.placeholder"
							:picker="item.picker"
						/>
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
		<template #actions>
			<a-row>
				<a-col :span="24" class="search-btn">
					<a-button type="primary" @click="onSearch"
						>查询</a-button
					>
					<a-button style="margin: 0 10px" @click="onReset"
						>重置</a-button
					>
				</a-col>
			</a-row>
		</template>
	</a-card>
	<a-card
		v-if="descModel"
		:title="title"
		:loading="loading"
		:bordered="false"
		size="small"
		style="min-height: 100px"
	>
		<slot name="body">请输入您的描述内容</slot>
	</a-card>
</template>
<style lang="less" scoped>
:deep(.ant-form-item) {
	margin-bottom: 0 !important;
}
.search-btn {
	float: right;
	display: flex;
	justify-content: center;
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 13px;
		color: #1890ff;
		cursor: pointer;
	}
}
</style>
