<script setup lang="ts">
import { toRefs } from 'vue';
interface Props {
	title?: string;
	loading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	title: '',
	loading: false,
});
const { title, loading } = toRefs(props);
</script>

<template>
	<a-card
		:title="title"
		:loading="loading"
		:bordered="false"
		size="small"
		style="min-height: 100px"
	>
		<slot name="body">请输入您的描述内容</slot>
	</a-card>
</template>
<style lang="less" scoped>
/deep/.ant-form-item {
	margin-bottom: 0 !important;
}
</style>
