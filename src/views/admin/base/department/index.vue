<script setup lang="ts">
import DescHead from '@/components/commmon/descHead/index.vue';
import Page from '@/components/commmon/page/index.vue';
import { createModelConfig } from './config';
import useDepartment from './useDeparment';
const config = createModelConfig();
const {
	loading,
	departmentForm,
	modelRef,
	tableConfig,
	departmentList,
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
			<ModelForm
				ref="modelRef"
				v-model:state="departmentForm"
				:config="config"
				@submit="onSubmit"
			/>
			<Table
				:config="tableConfig"
				:loading="loading"
				@add="onOpenMode"
				:sourse="departmentList"
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
