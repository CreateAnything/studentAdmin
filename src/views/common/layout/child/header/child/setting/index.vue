<script setup lang="ts">
import { SettingOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
const visible = ref<boolean>(false);

const onSetting = () => {
	visible.value = true;
};
const afterVisibleChange = (bool: boolean) => {
	console.log(bool, 'as');
};
</script>
<template>
	<div>
		<div @click="onSetting">
			<a-tooltip>
				<template #title>配置项</template>
				<setting-outlined class="icon" />
			</a-tooltip>
		</div>
		<a-drawer
			v-model:visible="visible"
			class="custom-class"
			title="GlobalConfig"
			placement="right"
			:closable="false"
			@after-visible-change="afterVisibleChange"
		>
			<p>Some contents...</p>
			<p>Some contents...</p>
			<p>Some contents...</p>
		</a-drawer>
	</div>
</template>
<style lang="less" scoped></style>
