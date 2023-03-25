<script setup lang="ts">
import DescHead from '@/components/commmon/descHead/index.vue';
import Page from '@/components/commmon/page/index.vue';
import useUser from './useUser';
const {
	loading,
	userForm,
	userList,
	TableColums,
	formatRole,
	ModelConfig,
	modelRef,
	onEdit,
	onOpenModel,
	onRemove,
	onSubmit,
} = useUser();
</script>
<template>
	<Page :show-head="true" v-loading="loading">
		<template #head>
			<DescHead title="用户管理">
				<template #body>管理用户信息增删改查的模块</template>
			</DescHead>
		</template>
		<template #main>
			<a-card>
				<ModelForm
					ref="modelRef"
					v-model:state="userForm"
					:config="ModelConfig"
					@submit="onSubmit"
				/>
				<template #extra>
					<a-button type="primary" @click="onOpenModel"
						>新增</a-button
					>
				</template>
				<a-table
					style="height: 100%"
					:columns="TableColums"
					:data-source="userList"
				>
					<template #bodyCell="{ column, record }">
						<template v-if="column.key === 'isEnabled'">
							<a-switch
								:disabled="true"
								v-model:checked="record.roleId"
							/>
						</template>
						<template v-if="column.key === 'roleId'">
							{{ formatRole(record.roleId) }}
						</template>
						<template v-if="column.key == 'action'">
							<a-button
								type="primary"
								size="small"
								@click="() => onEdit(record)"
								>编辑</a-button
							>
							<confirm
								@confirm="() => onRemove(record.id)"
							/>
						</template>
					</template>
				</a-table>
			</a-card>
		</template>
	</Page>
</template>
