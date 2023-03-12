<script setup lang="ts">
import Breadcrumb from '@/components/business/breadcrumb/index.vue';
import { useGlobalStore } from '@/store/global';
import { usePremissionStore } from '@/store/premission';
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';
import Mine from './child/mine/index.vue';
import Setting from './child/setting/index.vue';
const { collapsed } = storeToRefs(useGlobalStore());
const premission = usePremissionStore();
premission.setRouterKeysMap();
</script>

<template>
	<a-row :span="24" type="flex" justify="space-between" class="header">
		<a-col :span="8" class="header-left">
			<menu-unfold-outlined
				v-if="collapsed"
				class="trigger"
				@click="() => (collapsed = !collapsed)"
			/>
			<menu-fold-outlined
				v-else
				class="trigger"
				@click="() => (collapsed = !collapsed)"
			/>
			<Breadcrumb :keys="premission.getPathName" />
		</a-col>

		<a-col :span="8" class="header-right">
			<div><Mine /></div>
			<div><Setting /></div>
		</a-col>
	</a-row>
</template>
<style lang="less" scoped>
@import url('./index.less');
</style>
