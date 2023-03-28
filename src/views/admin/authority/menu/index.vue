<script setup lang="ts">
import ModelForm from '@/components/commmon/modelForm/index.vue';
import Page from '@/components/commmon/page/index.vue';
import { createTabConfig } from './config';
import Tree from './tree/index.vue';
import { MenuTree } from './type';
import useMenu from './useMenu';
const TabConfig = createTabConfig();

const {
	loading,
	nodeList,
	activeKey,
	menuTree,
	menuForm,
	modelConfig,
	modelRef,
	menuList,
	nodeSelect,
	onTabsChange,
	onSubmit,
	tableConfig,
	onDelete,
	onEdit,
	onOpenModel,
} = useMenu();
</script>

<template>
	<Page :show-head="false" v-loading="loading">
		<template #main>
			<a-card>
				<ModelForm
					ref="modelRef"
					:config="modelConfig"
					v-model:state="menuForm"
					@submit="onSubmit"
					:form-config="{ wrappercol: { span: 24 } }"
				/>
				<a-tabs
					@change="onTabsChange"
					v-model:activeKey="activeKey"
				>
					<a-tab-pane
						v-for="item in TabConfig"
						:key="item.value"
						:tab="item.label"
					>
						<a-row :gutter="8">
							<a-col :span="7">
								<a-card>
									<Tree
										@node-select="nodeSelect"
										:menu-tree="(menuTree as MenuTree[])"
										:menu-list="menuList"
									/>
								</a-card>
							</a-col>
							<a-col :span="17">
								<Table
									:config="tableConfig"
									:loading="loading"
									@add="onOpenModel"
									:sourse="nodeList"
								>
									<template v-slot:bodyCell="{ scope }">
										<template
											v-if="
												scope.column.key ===
												'enable'
											"
										>
											<a-switch
												:disabled="true"
												:checked-value="1"
												:un-checked-value="0"
												v-model:checked="
													scope.record.enable
												"
											/>
										</template>
										<template
											v-if="
												scope.column.key ===
												'icon'
											"
										>
											<svg-icon
												:name="scope.record.icon"
												:color="'#000000'"
											></svg-icon>
										</template>
										<template
											v-if="
												scope.column.key ==
												'action'
											"
										>
											<a-button
												type="primary"
												size="small"
												@click="
													() =>
														onEdit(
															scope.record
														)
												"
												>编辑</a-button
											>
											<confirm
												@confirm="
													() =>
														onDelete(
															scope.record
																.id
														)
												"
											/>
										</template>
									</template>
								</Table>
							</a-col>
						</a-row>
					</a-tab-pane>
				</a-tabs>
			</a-card>
		</template>
	</Page>
</template>
