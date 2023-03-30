<script lang="ts" setup>
import { TableProps } from 'ant-design-vue';
import { computed, reactive, toRefs, useSlots } from 'vue';
import { TableConfig } from './type';
interface Props {
	sourse: any[];
	loading: boolean;
	config: TableConfig;
	pagination?: TableProps['pagination'];
}
const props = withDefaults(defineProps<Props>(), {
	loading: false,
	config: () => ({
		title: '',
		colums: [],
		sourse: [],
		pageSize: 5,
		bordered: true,
		showAdd: true,
		size: 'middle',
	}),
});
const paginationState = reactive<{ current: number; pageSize: number }>({
	current: 1,
	pageSize: props.config.pageSize || 5,
});
const slots = useSlots();
const renderArr = Object.keys(slots);
const paginationChange: TableProps['onChange'] = ({ current }) => {
	current && (paginationState.current = current);
};
const emit = defineEmits<{
	(e: 'add'): void;
	(e: 'update:modeValue', value: boolean): void;
}>();

const { config, loading, sourse } = toRefs(props);
const GetColums = computed<TableProps['columns']>(() => {
	return config.value.colums?.map((item) => {
		return {
			...item,
			align: 'center',
		};
	});
});
const onAdd = () => {
	emit('add');
};
</script>
<template>
	<a-card :loading="loading">
		<template #extra>
			<a-button
				v-if="config?.showAdd"
				type="primary"
				@click="onAdd"
				>{{ config.addName ? config.addName : '新增' }}</a-button
			>
		</template>
		<a-table
			v-if="sourse.length > 0"
			style="height: 100%"
			:columns="GetColums"
			:data-source="sourse"
			:size="config.size"
			:bordered="config.bordered"
			:pagination="paginationState"
			@change="paginationChange"
		>
			<template v-slot:[item]="scope" v-for="item in renderArr">
				<slot :name="item" :scope="scope"></slot>
			</template>
		</a-table>
		<a-empty v-else :description="null" style="height: 100%" />
	</a-card>
</template>
<style lang="less" scoped>
:deep(.ant-empty-description) {
	color: #dce0e6;
}
</style>
