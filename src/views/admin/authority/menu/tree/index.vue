<script setup lang="ts">
import { getTreeToList } from '@/utils/index';
import type { TreeProps } from 'ant-design-vue';
import { MenuItem } from 'global';
import { computed, onMounted, ref, toRefs, watch } from 'vue';
interface Props {
	menuTree: MenuItem[];
	search?: boolean;
	color?: string;
}
const props = withDefaults(defineProps<Props>(), {
	search: true,
	color: 'red',
});
const emits = defineEmits<{
	(e: 'nodeSelect', node: MenuItem[]): void;
}>();

let menuList: MenuItem[] = [];
const { menuTree, search } = toRefs(props);

const selectedKeys = ref<string[]>([]);
const searchValue = ref<string>('');
const autoExpandParent = ref<boolean>(true);
const expandedKeys = ref<(string | undefined)[]>(['000000']);
const fieldNames: TreeProps['fieldNames'] = {
	children: 'children',
	title: 'name',
	key: 'id',
};
//节点点击事件
const handleNodeChecked: TreeProps['onSelect'] = (_kyes, info) => {
	emits('nodeSelect', info.node.dataRef?.children as MenuItem[]);
};
//节点展开事件
const handleExpand = (keys: string[]) => {
	expandedKeys.value = keys;
	autoExpandParent.value = false;
};
//通过keywords找到父级的节点
const findParentId = (key: string | undefined): string[] => {
	const result = menuList.reduce((pre: string[], next) => {
		if (key !== undefined && next.name.includes(key)) {
			pre.push(next.parentId);
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
	searchValue.value = value;
	autoExpandParent.value = true;
});

onMounted(() => {
	menuList = getTreeToList<MenuItem>(menuTree.value);
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
			:tree-data="menuTree"
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
