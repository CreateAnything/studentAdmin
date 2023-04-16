<script setup lang="ts" name="Menu">
import { useGlobalStore } from '@/store/global';
import { usePremissionStore } from '@/store/premission';
import { MenuTree } from '@/views/admin/authority/menu/type';
import { MenuProps } from 'ant-design-vue';
import { Key } from 'ant-design-vue/lib/_util/type';
import { onMounted, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import SubMenu from './menuItem/index.vue';
const premission = usePremissionStore();
const global = useGlobalStore();
const props = defineProps<{
	menuList: MenuTree[];
}>();

const router = useRouter();
const { menuList } = toRefs(props);
const selectedKeys = ref<Key[]>([]);
const openKeys = ref<Key[]>([]);
const handleMenuItemChange: MenuProps['onClick'] = (info) => {
	router.push(info.key as string);
};
const onOpenChange: MenuProps['onOpenChange'] = (Keys) => {
	const lateKey = Keys.at(-1);
	lateKey && (openKeys.value = [lateKey]);
};
router.beforeEach((to) => {
	openKeys.value = to.matched.map((it) => it.path);
	selectedKeys.value = [to.path];
	premission.currentPath = to.fullPath;
});
onMounted(() => {
	const route = router.currentRoute.value;
	openKeys.value = route.matched.map((it) => it.path);
	selectedKeys.value = [route.path];
});
</script>

<template>
	<div class="menu-logo">Admin Pro</div>
	<a-menu
		v-model:selectedKeys="selectedKeys"
		v-model:openKeys="openKeys"
		mode="inline"
		:theme="global.siderMode"
		@openChange="onOpenChange"
		@click="handleMenuItemChange"
	>
		<template v-for="item in menuList" :key="item.key">
			<template v-if="item.children.length === 0">
				<a-menu-item :key="item.url">
					<template #icon>
						<svg-icon
							:name="item.icon"
							:color="global.getIconColor"
						></svg-icon>
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
