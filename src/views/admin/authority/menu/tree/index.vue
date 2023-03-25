<script setup lang="ts">
import type { TreeProps } from 'ant-design-vue';
import { Key } from 'ant-design-vue/lib/_util/type';
import { computed, ref, toRefs, watch } from 'vue';
import { MenuItem, MenuTree } from '../type';
interface Props {
	menuTree: MenuTree[];
	menuList: MenuItem[];
	search?: boolean;
	color?: string;
}
const props = withDefaults(defineProps<Props>(), {
	search: true,
	color: 'red',
});
const emits = defineEmits<{
	(e: 'nodeSelect', node: MenuTree[]): void;
}>();

const { menuTree, search, menuList } = toRefs(props);

const selectedKeys = ref<string[]>([]);
const searchValue = ref<string>('');
const autoExpandParent = ref<boolean>(true);
const expandedKeys = ref<Key[]>(['000000']);
const fieldNames: TreeProps['fieldNames'] = {
	children: 'children',
	title: 'name',
	key: 'id',
};
//节点点击事件
const handleNodeChecked: TreeProps['onSelect'] = (_kyes, info) => {
	const Menu = info.node.dataRef?.children as unknown as MenuTree[];
	emits('nodeSelect', Menu);
};
//节点展开事件
const handleExpand: TreeProps['onExpand'] = (keys) => {
	expandedKeys.value = keys;
	autoExpandParent.value = false;
};
//通过keywords找到父级的节点
const findParentId = (key: string | undefined): string[] => {
	const result = menuList.value.reduce((pre: string[], next) => {
		if (key !== undefined && next.name.includes(key)) {
			next.parentId && pre.push(next?.parentId);
		}
		return pre;
	}, []);
	return Array.from(new Set(result));
};
//看渲染的节点也没有符合搜索的
const hasName = computed(() => {
	return (name: string) => name.indexOf(searchValue.value) > -1;
});
//截取前半部分名字
const subName = computed(() => {
	return (name: string) =>
		name.substring(
			name.indexOf(searchValue.value) + searchValue.value.length
		);
});
//截取后半部分名字
const sliceName = computed(() => {
	return (name: string) =>
		name.substr(0, name.indexOf(searchValue.value));
});

//监听搜索事件
watch(searchValue, (value) => {
	expandedKeys.value = findParentId(value as string);
	console.log(expandedKeys.value, 'as');
	searchValue.value = value;
	autoExpandParent.value = true;
});
</script>
<template>
	<div>
		<a-input-search
			v-if="search"
			v-model:value="searchValue"
			style="margin-bottom: 8px"
			placeholder="Search"
		/>
		<a-tree
			v-model:selectedKeys="selectedKeys"
			:expanded-keys="expandedKeys"
			default-expand-all
			:field-names="fieldNames"
			:blockNode="true"
			:tree-data="menuTree as any"
			:auto-expand-parent="autoExpandParent"
			@select="handleNodeChecked"
			@expand="handleExpand"
		>
			<template #title="{ name }">
				<span v-if="hasName(name)">
					<span>{{ sliceName(name) }}</span>
					<span :style="{ color }">{{ searchValue }}</span>
					<span>{{ subName(name) }}</span>
				</span>
				<span v-else>{{ name }}</span>
			</template>
		</a-tree>
	</div>
</template>
