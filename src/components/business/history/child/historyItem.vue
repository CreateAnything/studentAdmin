<script setup lang="ts">
import { CloseOutlined } from '@ant-design/icons-vue';
const props = defineProps<{
	active: boolean;
	close: boolean;
	text: string | undefined;
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
</script>
<template>
	<div class="item">
		<span :class="{ active: props.active }" @click="onClick">{{
			props.text
		}}</span>
		<div class="close" v-if="props.close">
			<close-outlined @click="onClose" />
		</div>
	</div>
</template>
<style lang="less" scoped>
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
	animation: fade all 5s ease forwards;
	.active {
		color: #1890ff;
	}
	.close {
		color: #9399a5;
		margin-left: 2px;
		font-size: 11px;
	}
}

@keyframes fade {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>
