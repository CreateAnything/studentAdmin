<script setup lang="ts">
import { ref } from 'vue';
const loading = ref<boolean>(true);
setTimeout(() => {
	loading.value = false;
}, 3000);
</script>

<template>
	<div class="full-height" v-loading="loading"></div>
</template>
<style scoped lang="less">
.full-height {
	height: 100vh;
}
</style>
