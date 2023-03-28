<script setup lang="ts" name="Menu">
import { usePremissionStore } from '@/store/premission';
import { MenuTree } from '@/views/admin/authority/menu/type';
import { MenuProps } from 'ant-design-vue';
import { Key } from 'ant-design-vue/lib/_util/type';
import { ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import SubMenu from './menuItem/index.vue';
const props = defineProps<{
	menuList: MenuTree[];
}>();

const router = useRouter();
const premission = usePremissionStore();
const { menuList } = toRefs(props);
const selectedKeys = ref<Key[]>([]);
const openKeys = ref<Key[]>([]);
const currentPath = premission.getCurrentPath;
if (currentPath !== undefined) {
	selectedKeys.value = [currentPath];
}

openKeys.value = [premission.getFatherPath];
const handleMenuItemChange: MenuProps['onClick'] = (info) => {
	premission.setPathLevel(info.keyPath as Key[]);
	router.push(info.key as string);
};

const onOpenChange: MenuProps['onOpenChange'] = (Keys) => {
	const lateKey = Keys.at(-1);
	lateKey && (openKeys.value = [lateKey]);
};
</script>

<template>
	<div class="menu-logo">Admin Pro</div>
	<a-menu
		v-model:selectedKeys="selectedKeys"
		v-model:openKeys="openKeys"
		mode="inline"
		theme="dark"
		@openChange="onOpenChange"
		@click="handleMenuItemChange"
	>
		<template v-for="item in menuList" :key="item.key">
			<template v-if="item.children.length === 0">
				<a-menu-item :key="item.url">
					<template #icon>
						<svg-icon :name="item.icon"></svg-icon>
					</template>
					{{ item.name }}
				</a-menu-item>
			</template>
			<template v-else>
				<SubMenu :menu="item" :key="item.url"></SubMenu>
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
