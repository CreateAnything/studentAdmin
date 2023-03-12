<script setup lang="ts">
import { computed } from 'vue';
interface Props {
	name: string;
	color?: string;
	prefix?: string;
	className?: string;
}

const props = withDefaults(defineProps<Props>(), {
	color: 'white',
	prefix: 'icon',
	className: 'svg-icon ',
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
<template>
	<svg :class="props.className" aria-hidden="true">
		<use :xlink:href="symbolId" :fill="color" />
	</svg>
</template>
<style lang="less" scoped>
.svg-icon {
	width: 1.2em;
	height: 1.2em;
}
</style>
