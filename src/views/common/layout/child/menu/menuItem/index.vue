<script setup lang="ts" name="SubMenu">
import { useGlobalStore } from '@/store/global';
import { MenuTree } from '@/views/admin/authority/menu/type';
import SubMenu from '@/views/common/layout/child/menu/menuItem/index.vue';
import { toRefs } from 'vue';
const global = useGlobalStore();
const props = defineProps<{
	menu: MenuTree;
}>();
const { menu } = toRefs(props);
</script>
<template>
	<a-sub-menu :key="menu.url">
		<template #icon>
			<svg-icon
				:name="menu.icon"
				:color="global.getIconColor"
			></svg-icon>
		</template>
		<template #title>{{ menu.name }}</template>
		<template v-for="item in menu.children" :key="item.url">
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
				<SubMenu :menu="item" :key="item.url" />
			</template>
		</template>
	</a-sub-menu>
</template>
