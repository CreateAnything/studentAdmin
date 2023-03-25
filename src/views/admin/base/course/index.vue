<script setup lang="ts">
import DescHead from '@/components/commmon/descHead/index.vue';
import Page from '@/components/commmon/page/index.vue';
import useCourse from './useCourse';
const {
	loading,
	courseList,
	courseForm,
	TableColums,
	ModelConfig,
	modelRef,
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
			<a-card>
				<ModelForm
					ref="modelRef"
					v-model:state="courseForm"
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
					:data-source="courseList"
				>
					<template #bodyCell="{ column, record }">
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
