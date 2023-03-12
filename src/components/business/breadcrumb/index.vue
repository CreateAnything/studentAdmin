<script setup lang="ts">
interface Props {
	keys: string[];
}
const props = withDefaults(defineProps<Props>(), {
	keys: () => [],
});
</script>
<template>
	<a-breadcrumb>
		<a-breadcrumb-item
			v-for="(item, index) in props.keys"
			:key="index"
		>
			{{ item }}
		</a-breadcrumb-item>
	</a-breadcrumb>
</template>
