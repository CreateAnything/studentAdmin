<script setup lang="ts">
import { useGlobalStore } from '@/store/global';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import Content from './child/content/index.vue';
import Header from './child/header/index.vue';
import Menu from './child/menu/index.vue';
const { userInfo } = storeToRefs(useUserStore());
const global = useGlobalStore();
</script>
<template>
	<a-layout>
		<a-layout-sider :collapsed="global.collapsed">
			<Menu :menu-list="userInfo.menuList" />
		</a-layout-sider>
		<a-layout>
			<a-layout-header class="header">
				<Header />
			</a-layout-header>
			<a-layout-content class="main-page">
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
	margin: 24px @p-media;
	padding: 24px;
	background-color: #fff;
	padding: 0;
	height: 100vh;
}
</style>
