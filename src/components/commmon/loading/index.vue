<script setup lang="ts">
import { ref } from 'vue';
interface Props {
	size?: 'small' | 'large';
	tip?: string;
	delay?: number;
}
const props = withDefaults(defineProps<Props>(), {
	size: 'large',
	tip: 'Loading...',
	delay: 500,
});

const spinning = ref<boolean>(true);
</script>
<template>
	<div class="loading-wrapper">
		<a-spin
			:spinning="spinning"
			:size="props.size"
			:tip="props.tip"
			:delay="props.delay"
		/>
	</div>
</template>
<style scoped lang="less">
.loading-wrapper {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(0, 0, 0, 0.5);
}
</style>
