<script setup lang="ts">
import DescHead from '@/components/commmon/descHead/index.vue';
import Page from '@/components/commmon/page/index.vue';
import Table from '@/components/commmon/table/index.vue';
import useUser from './useUser';
const {
	loading,
	userForm,
	formatRole,
	ModelConfig,
	modelRef,
	TaleConfig,
	userList,
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
			<ModelForm
				ref="modelRef"
				v-model:state="userForm"
				:config="ModelConfig"
				@submit="onSubmit"
			/>
			<Table
				:config="TaleConfig"
				:loading="loading"
				@add="onOpenModel"
				:sourse="userList"
			>
				<template v-slot:bodyCell="{ scope }">
					<template
						v-if="scope.column.dataIndex === 'isEnabled'"
					>
						<a-switch
							:disabled="true"
							:un-checked-value="0"
							:checked-value="1"
							v-model:checked="scope.record.isEnabled"
						/>
					</template>
					<template v-if="scope.column.dataIndex === 'roleId'">
						{{ formatRole(scope.record.roleId) }}
					</template>
					<template v-if="scope.column.key == 'action'">
						<a-button
							type="primary"
							size="small"
							@click="() => onEdit(scope.record)"
							>编辑</a-button
						>
						<confirm
							@confirm="() => onRemove(scope.record.id)"
						/>
					</template>
				</template>
			</Table>
		</template>
	</Page>
</template>
