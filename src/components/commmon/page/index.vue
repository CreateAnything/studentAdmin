<script setup lang="ts">
interface Props {
	showHead: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	showHead: true,
});
</script>
<template>
	<div class="content">
		<div class="head-con" v-if="props.showHead">
			<slot name="head"></slot>
		</div>
		<div class="main-con">
			<slot name="main"></slot>
		</div>
	</div>
</template>
<style lang="less" scoped>
.content {
	width: 100%;
	display: flex;
	height: 100%;
	flex-direction: column;
	box-sizing: border-box;
	padding-bottom: 20px;
	overflow: hidden;
	.head-con {
		min-height: 100px;
		margin-bottom: 10px;
	}
	.main-con {
		flex: 1;
	}
}
</style>
