<script setup lang="ts">
import { useGlobalStore } from '@/store/global';
import { CloseOutlined } from '@ant-design/icons-vue';
import { computed } from 'vue';
import { RouteRecordName } from 'vue-router';
const global = useGlobalStore();
const props = defineProps<{
	active?: boolean;
	text?: string | RouteRecordName | null;
	path: string;
}>();
const emit = defineEmits<{
	(e: 'close'): void;
	(e: 'click'): void;
}>();
const onClose = () => {
	emit('close');
};
const onClick = () => {
	emit('click');
};
const isShowClose = computed(() => {
	return global.pathHome === props.path;
});
</script>
<template>
	<transition name="fade">
		<div class="item">
			<span :class="{ active }" @click="onClick">{{ text }}</span>
			<div class="close" v-if="!isShowClose">
				<close-outlined @click="onClose" />
			</div>
		</div>
	</transition>
</template>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
.item {
	height: 32px;
	padding: 6px 16px 4px;
	border-radius: 3px;
	margin-right: 6px;
	cursor: pointer;
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	width: auto;
	.active {
		color: #1890ff;
	}
	.close {
		font-size: 12px;
	}
}
</style>
