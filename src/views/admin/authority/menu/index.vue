<script setup lang="ts">
import ModelForm from '@/components/commmon/modelForm/index.vue';
import Page from '@/components/commmon/page/index.vue';
import TableMenu from './tableMenu/index.vue';
import Tree from './tree/index.vue';
import { MenuTree } from './type';
import useMenu from './useMenu';
const {
	loading,
	nodeList,
	activeKey,
	menuTree,
	menuForm,
	modelConfig,
	modelRef,
	menuList,
	onSubmit,
	onDelete,
	onEdit,
	onOpenModel,
} = useMenu();
</script>

<template>
	<Page :show-head="false" v-loading="loading">
		<template #main>
			<ModelForm
				ref="modelRef"
				:config="modelConfig"
				v-model:state="menuForm"
				@submit="onSubmit"
				:form-config="{ wrappercol: { span: 24 } }"
			/>
			<a-tabs v-model:activeKey="activeKey">
				<a-tab-pane :key="3" tab="管理端">
					<a-row :gutter="8">
						<a-col :span="7">
							<a-card>
								<Tree
									@node-select="
										(menu) => (nodeList = menu)
									"
									:menu-tree="(menuTree as MenuTree[])"
									:menu-list="menuList"
								/>
							</a-card>
						</a-col>
						<a-col :span="17">
							<a-card>
								<template #extra>
									<a-button
										type="primary"
										@click="onOpenModel"
										>新增</a-button
									>
								</template>
								<TableMenu
									:data="nodeList"
									@delete="onDelete"
									@edit="onEdit"
								/>
							</a-card>
						</a-col>
					</a-row>
				</a-tab-pane>
				<a-tab-pane :key="2" tab="教师菜单" force-render>
				</a-tab-pane>
				<a-tab-pane :key="1" tab="学生菜单"> </a-tab-pane>
			</a-tabs>
		</template>
	</Page>
</template>
