<script setup lang="ts">
import type { TableColumnsType } from 'ant-design-vue';
import { MenuItem } from 'global';

defineProps<{
	data: MenuItem[];
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
		dataIndex: 'key',
		key: 'key',
		align: 'center',
	},
	{
		title: 'Icon',
		dataIndex: 'icon',
		key: 'icon',
		align: 'center',
	},
	{
		title: 'Order',
		dataIndex: 'order',
		key: 'order',
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
const onDeleteConfirmOk = () => {
	console.log('删除');
};
</script>

<template>
	<a-table :columns="columns" :data-source="data">
		<template #bodyCell="{ column, record }">
			<template v-if="column.key === 'enable'">
				<a-switch
					:disabled="true"
					v-model:checked="record.enable"
				/>
			</template>
			<template v-if="column.key === 'icon'">
				<svg-icon :name="record.icon" :color="'black'"></svg-icon>
			</template>
			<template v-if="column.key === 'action'">
				<a-button type="primary" size="small">编辑</a-button>
				<confirm @confirm="onDeleteConfirmOk"> </confirm>
			</template>
		</template>
	</a-table>
</template>
<style lang="less" scoped></style>
