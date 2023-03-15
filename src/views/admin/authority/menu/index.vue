<script setup lang="ts">
import Page from '@/components/commmon/page/index.vue';
import { useUserStore } from '@/store/user';
import { MenuItem } from 'global';
import { onMounted, ref } from 'vue';
import Model from './model/index.vue';
import TableMenu from './tableMenu/index.vue';
import Tree from './tree/index.vue';
type MenuTree = Partial<MenuItem>[];

const user = useUserStore();
const nodeList = ref<MenuItem[]>([]);
const visible = ref<boolean>(false);
const menuTree = ref<MenuTree>([
	{
		name: '菜单管理',
		children: user.userInfo.menuList,
		id: '000000',
		key: 'root',
	},
]);

const handleAdd = () => {
	visible.value = true;
};
const handleCancel = () => {
	visible.value = false;
};
onMounted(() => {
	nodeList.value = user.userInfo.menuList;
});
</script>

<template>
	<Page :show-head="false">
		<template #main>
			<a-row :gutter="8">
				<a-col :span="7">
					<a-card>
						<Tree
							@node-select="(menu) => (nodeList = menu)"
							:menu-tree="(menuTree as MenuItem[])"
						/>
					</a-card>
				</a-col>
				<a-col :span="17">
					<a-card>
						<template #extra>
							<a-button type="primary" @click="handleAdd"
								>新增</a-button
							>
						</template>
						<TableMenu :data="nodeList" />
						<Model
							:visible="visible"
							@cancel="handleCancel"
							:tree-data="menuTree"
						/>
					</a-card>
				</a-col>
			</a-row>
		</template>
	</Page>
</template>
