<script setup lang="ts">
import { useHistoryStore } from '@/store/history';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import HistoryItem from './child/historyItem.vue';
const history = useHistoryStore();
const router = useRouter();

const handleClick = (index: number) => {
	history.setIndex(index);
	const currentItem = history.getCurrentHistory;
	router.push({ path: currentItem.path });
};
const handleClose = (index: number) => {
	history.removeStack(index);
	const currentItem = history.getCurrentHistory;
	router.push({ path: currentItem.path });
};

router.beforeEach((to, _from, next) => {
	const fullPath = to.fullPath;
	const name = to.name as string;
	history.setStack({ name: name, path: fullPath });
	next();
});

const isActive = computed(() => {
	return (index: number) => {
		return history.index === index;
	};
});

const showClose = computed(() => {
	return (index: number) => {
		return index !== 0;
	};
});
</script>
<template>
	<div class="history">
		<div v-for="(item, index) in history.pathStack" :key="item.path">
			<HistoryItem
				@close="handleClose(index)"
				@click="handleClick(index)"
				:active="isActive(index)"
				:close="showClose(index)"
				:text="item.name"
			/>
		</div>
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
