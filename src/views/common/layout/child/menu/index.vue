<script setup lang="ts" name="Menu">
import { usePremissionStore } from '@/store/premission';
import { ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import SubMenu from './menuItem/index.vue';
import { MenuItem } from 'global';
const props = defineProps<{
	menuList: MenuItem[];
}>();
type MenuEvent = {
	key: string;
	keyPath: string[];
};
const router = useRouter();
const premission = usePremissionStore();

const { menuList } = toRefs(props);
const selectedKeys = ref<string[]>();
const openKeys = ref<string[]>([]);

selectedKeys.value = [premission.getCurrentPath as string];
openKeys.value = [premission.getFatherPath];

const handleMenuItemChange = (item: MenuEvent) => {
	premission.pathLevel = item.keyPath;
	router.push(item.key);
};
</script>

<template>
	<div class="menu-logo">Admin Pro</div>
	<a-menu
		v-model:selectedKeys="selectedKeys"
		v-model:openKeys="openKeys"
		mode="inline"
		theme="dark"
		@click="handleMenuItemChange"
	>
		<template v-for="item in menuList" :key="item.key">
			<template v-if="!item.children">
				<a-menu-item :key="item.path">
					<template #icon>
						<svg-icon :name="item.icon"></svg-icon>
					</template>
					{{ item.name }}
				</a-menu-item>
			</template>
			<template v-else>
				<SubMenu :menu="item" :key="item.path"></SubMenu>
			</template>
		</template>
	</a-menu>
</template>
<style lang="less" scoped>
.menu-logo {
	box-sizing: border-box;
	height: 32px;
	background: rgba(232, 210, 210, 0.3);
	margin: 16px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: @theme-color;
	font-weight: 600;
	font-size: 10px;
	text-align: center;
}
.menu-wrapper {
	height: 100vh;
}
</style>
