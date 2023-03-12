<script setup lang="ts" name="SubMenu">
import SubMenu from '@/views/common/layout/child/menu/menuItem/index.vue';
import { MenuItem } from '@/vite-env';
import { toRefs } from 'vue';
const props = defineProps<{
	menu: MenuItem;
}>();
const { menu } = toRefs(props);
</script>
<template>
	<a-sub-menu :key="menu.path">
		<template #icon>
			<svg-icon :name="menu.icon"></svg-icon>
		</template>
		<template #title>{{ menu.name }}</template>
		<template v-for="item in menu.children" :key="item.path">
			<template v-if="!item.children">
				<a-menu-item :key="item.path">
					<template #icon>
						<svg-icon :name="item.icon"></svg-icon>
					</template>
					{{ item.name }}
				</a-menu-item>
			</template>
			<template v-else>
				<SubMenu :menu="item" :key="item.path" />
			</template>
		</template>
	</a-sub-menu>
</template>
