<script setup lang="ts">
import DescHead from '@/components/commmon/descHead/index.vue';
import ModelForm from '@/components/commmon/modelForm/index.vue';
import Page from '@/components/commmon/page/index.vue';
import useTeacher from './useTeacher';
const {
	loading,
	tableConfig,
	config,
	onEdit,
	onSubmit,
	modelRef,
	onRemove,
	onAdd,
	teacherForm,
	teacherList,
} = useTeacher();
</script>

<template>
	<Page :show-head="true" v-loading="loading">
		<template #head>
			<DescHead title="教师管理">
				<template #body>用于教师的增删改查模块</template>
			</DescHead>
		</template>
		<template #main>
			<ModelForm
				ref="modelRef"
				v-model:state="teacherForm"
				:config="config"
				@submit="onSubmit"
			/>
			<Table
				:config="tableConfig"
				:loading="loading"
				@add="onAdd"
				:sourse="teacherList"
			>
				<template v-slot:bodyCell="{ scope }">
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
