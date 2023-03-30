<script setup lang="ts">
import { useGlobalStore } from '@/store/global';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import Content from './child/content/index.vue';
import Header from './child/header/index.vue';
import Menu from './child/menu/index.vue';
const { menuTree } = storeToRefs(useUserStore());
const global = useGlobalStore();
</script>
<template>
	<a-layout>
		<a-layout-sider
			:collapsed="global.collapsed"
			:style="{ background: global.getColor }"
		>
			<Menu :menu-list="menuTree" />
		</a-layout-sider>
		<a-layout>
			<a-layout-header class="header">
				<Header />
			</a-layout-header>
			<a-layout-content
				class="main-page"
				:class="{ mainAc: global.showHistory }"
			>
				<History
					v-if="global.showHistory"
					:class="{ history: global.showHistory }"
				/>
				<Content />
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>
<style lang="less" scoped>
.header {
	padding: 0;
	background-color: white;
}
.main-page {
	margin: @m-small @p-media;
	padding: 24px;
	// background-color: #f5f7f9;
	padding: 0;
	height: 100vh;
	.history {
		margin: 5px 0 !important;
	}
}
.mainAc {
	margin-top: 0 !important;
}
</style>
