<script lang="ts" setup>
import { TableColumnsType } from 'ant-design-vue';
import { computed, toRefs } from 'vue';
interface Props {
	colums: TableColumnsType;
	sourse: any[];
	title?: string;
	btnSize?: 'small' | 'large';
}
const props = withDefaults(defineProps<Props>(), {
	title: '',
	btnSize: 'small',
});

const emit = defineEmits<{
	(e: 'edit', id: number): void;
	(e: 'add'): void;
	(e: 'remove', id: number): void;
}>();
const { colums, sourse, btnSize } = toRefs(props);
const GetColums = computed<TableColumnsType>(() => {
	return colums.value.map((item) => {
		return {
			...item,
			key: item.key,
			align: 'center',
		};
	});
});
const onAdd = () => {
	emit('add');
};
const onEdit = (id: number) => {
	emit('edit', id);
};
const onRemove = (id: number) => {
	emit('remove', id);
};
</script>
<template>
	<a-card>
		<template #extra>
			<a-button type="primary" @click="onAdd">新增</a-button>
		</template>
		<a-table
			style="height: 100%"
			:columns="GetColums"
			:data-source="sourse"
		>
			<template #bodyCell="{ column, record }">
				<template v-if="column.key == 'action'">
					<a-button
						type="primary"
						:size="btnSize"
						@click="() => onEdit(record.id)"
						>编辑</a-button
					>
					<confirm @confirm="() => onRemove(record.id)" />
				</template>
			</template>
		</a-table>
	</a-card>
</template>
