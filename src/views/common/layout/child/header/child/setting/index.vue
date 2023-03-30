<script setup lang="ts">
import { useGlobalStore } from '@/store/global';
import { SettingOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
const global = useGlobalStore();
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
			<a-row>
				<a-col :span="12" class="address">
					<a-col :span="10"> 导航栏: </a-col>
					<a-col :span="7">
						<a-switch v-model:checked="global.showHistory" />
					</a-col>
				</a-col>
				<a-col :span="12" class="address">
					<a-col :span="10"> 菜单白色: </a-col>
					<a-col :span="7">
						<a-switch
							:checked-value="'light'"
							:un-checked-value="'dark'"
							v-model:checked="global.siderMode"
						/>
					</a-col>
				</a-col>
			</a-row>
		</a-drawer>
	</div>
</template>
<style lang="less" scoped>
.address {
	display: flex;
	align-items: center;
}
</style>
