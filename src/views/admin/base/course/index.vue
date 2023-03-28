<script setup lang="ts">
import DescHead from '@/components/commmon/descHead/index.vue';
import Page from '@/components/commmon/page/index.vue';
import useCourse from './useCourse';
const {
	loading,
	courseForm,
	tableConfig,
	ModelConfig,
	modelRef,
	courseList,
	onOpenModel,
	onEdit,
	onRemove,
	onSubmit,
} = useCourse();
</script>
<template>
	<Page :show-head="true" v-loading="loading">
		<template #head>
			<DescHead title="课程管理">
				<template #body>管理课程增删改查的模块</template>
			</DescHead>
		</template>
		<template #main>
			<ModelForm
				ref="modelRef"
				v-model:state="courseForm"
				:config="ModelConfig"
				@submit="onSubmit"
			/>
			<Table
				:config="tableConfig"
				:loading="loading"
				@add="onOpenModel"
				:sourse="courseList"
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
