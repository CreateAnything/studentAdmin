<script setup lang="ts">
import type { TableColumnsType } from 'ant-design-vue';
import { MenuTree } from '../type';

defineProps<{
	data: MenuTree[];
}>();
const emit = defineEmits<{
	(e: 'edit', payload: any): void;
	(e: 'delete', id: number): void;
}>();
const columns: TableColumnsType = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		align: 'center',
	},
	{
		title: 'Key',
		dataIndex: 'keyd',
		key: 'keyd',
		align: 'center',
	},
	{
		title: 'Icon',
		dataIndex: 'icon',
		key: 'icon',
		align: 'center',
	},
	{
		title: 'Sort',
		dataIndex: 'sort',
		key: 'sort',
		align: 'center',
	},
	{
		title: 'Enable',
		dataIndex: 'enable',
		key: 'enable',
		align: 'center',
	},
	{
		title: 'Action',
		dataIndex: 'action ',
		key: 'action',
		align: 'center',
	},
];
const onDeleteConfirmOk = (id: number) => {
	emit('delete', id);
};
const onEdit = (payload: any) => {
	emit('edit', payload);
};
</script>

<template>
	<a-table :columns="columns" :data-source="data">
		<template #bodyCell="{ column, record }">
			<template v-if="column.key === 'enable'">
				<a-switch
					:disabled="true"
					:checked-value="1"
					:un-checked-value="0"
					v-model:checked="record.enable"
				/>
			</template>
			<template v-if="column.key === 'icon'">
				<svg-icon
					:name="record.icon"
					:color="'#000000'"
				></svg-icon>
			</template>
			<template v-if="column.key === 'action'">
				<a-button
					type="primary"
					size="small"
					@click="onEdit(record)"
					>编辑</a-button
				>
				<confirm @confirm="onDeleteConfirmOk(record.id)">
				</confirm>
			</template>
		</template>
	</a-table>
</template>
<style lang="less" scoped></style>
