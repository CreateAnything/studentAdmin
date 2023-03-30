<script setup lang="ts">
import { findPreMap } from '@/utils';
import { onMounted, ref } from 'vue';
import { RouteRecordName, useRouter } from 'vue-router';
import HistoryItem from './child/historyItem.vue';
type ItemType = {
	name?: string | RouteRecordName | null;
	active?: boolean;
};
type StackMap = Map<string, ItemType>;
const router = useRouter();
const routerStack = ref<StackMap>(new Map([]));
const path = ref<string>('');

router.beforeEach(({ fullPath, name }, from) => {
	if (from.path === '/login') {
		//从登录进来
		setStack(fullPath, { name, active: true });
		setPath(fullPath);
	} else {
		if (fullPath === '/login') {
			//跳转登录页面
			routerStack.value = new Map();
			localStorage.removeItem('routerStack');
			localStorage.removeItem('path');
		} else {
			removeNoPathActive(
				routerStack.value.get(path.value) as ItemType
			);
			setPath(fullPath);
			setStack(fullPath, { name, active: true });
		}
	}
});

const removeNoPathActive = (item: ItemType) => {
	if (path.value) {
		setStack(path.value, {
			name: item.name,
			active: false,
		});
	}
};

const onClose = (item: [string, ItemType]) => {
	if (item[0] === path.value) {
		const preRoute = findPreMap<string, ItemType>(
			routerStack.value,
			item[0]
		);
		if (preRoute) {
			setPath('');
			router.push(preRoute[0]);
			removeStack(item[0]);
		}
	} else {
		removeStack(item[0]);
	}
};
const itemClick = (item: [string, ItemType]) => {
	router.push(item[0]);
};

const setStack = (path: string, route: ItemType) => {
	routerStack.value.set(path, route);
	setLocal();
};
const removeStack = (path: string) => {
	routerStack.value.delete(path);
	setLocal();
};
const setLocal = () => {
	localStorage.setItem(
		'routerStack',
		JSON.stringify(Array.from(routerStack.value.entries()))
	);
};
const getLocal = (): Map<string, ItemType> => {
	return new Map(
		JSON.parse(localStorage.getItem('routerStack') as string)
	);
};
const setPath = (url: string) => {
	path.value = url;
	localStorage.setItem('path', path.value);
};
const getPath = (): string => {
	return localStorage.getItem('path') as string;
};

onMounted(() => {
	routerStack.value = getLocal();
	path.value = getPath();
});
</script>
<template>
	<div class="history">
		<HistoryItem
			v-for="(item, key) in routerStack"
			:key="key"
			@close="onClose(item)"
			@click="itemClick(item)"
			:active="item[1]?.active"
			:text="item[1].name"
			:path="item[0]"
		/>
	</div>
</template>
<style lang="less" scoped>
@gap: 5px;
.history {
	height: 40px;
	margin: @gap 0;
	box-sizing: border-box;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
</style>
