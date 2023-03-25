<script setup lang="ts">
import DescHead from '@/components/commmon/descHead/index.vue';
import Page from '@/components/commmon/page/index.vue';
import { Colums, createModelConfig } from './config';
import useDepartment from './useDeparment';
const config = createModelConfig();
const {
	loading,
	departmentList,
	departmentForm,
	modelRef,
	onEdit,
	onOpenMode,
	onRemove,
	onSubmit,
} = useDepartment();
</script>
<template>
	<Page :show-head="true" v-loading="loading">
		<template #head>
			<DescHead title="院系管理">
				<template #body> 院系增删改查的模块 </template>
			</DescHead>
		</template>
		<template #main>
			<a-card>
				<ModelForm
					ref="modelRef"
					v-model:state="departmentForm"
					:config="config"
					@submit="onSubmit"
				/>
				<template #extra>
					<a-button type="primary" @click="onOpenMode"
						>新增</a-button
					>
				</template>
				<a-table
					style="height: 100%"
					:columns="Colums"
					:data-source="departmentList"
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
