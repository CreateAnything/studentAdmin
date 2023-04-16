<script setup lang="ts">
import { usePremissionStore } from '@/store/premission';
import { computed } from 'vue';
const premission = usePremissionStore();
const getRoute = computed(() => {
	return premission.getBreadcrumbNams;
});
</script>
<template>
	<a-breadcrumb>
		<a-breadcrumb-item v-for="(item, index) in getRoute" :key="index">
			{{ item }}
		</a-breadcrumb-item>
	</a-breadcrumb>
</template>
