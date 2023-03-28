<script setup lang="ts">
import DescHead from '@/components/commmon/descHead/index.vue';
import ModelFrom from '@/components/commmon/modelForm/index.vue';
import Page from '@/components/commmon/page/index.vue';
import Table from '@/components/commmon/table/index.vue';
import useClass from './useClass';
const {
	loading,
	configs,
	tableConfig,
	modelRef,
	stateForm,
	classList,
	onAdd,
	onSubmit,
	onEdit,
	removeClass,
} = useClass();
</script>
<template>
	<Page :show-head="true" v-loading="loading">
		<template #head>
			<DescHead title="班级管理">
				<template #body>
					这是一个用于对班级进行增删改查的模块
				</template>
			</DescHead>
		</template>
		<template #main>
			<ModelFrom
				v-model:state="stateForm"
				ref="modelRef"
				@submit="onSubmit"
				:config="configs"
			/>
			<Table
				:config="tableConfig"
				:loading="loading"
				@add="onAdd"
				:sourse="classList"
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
							@confirm="() => removeClass(scope.record.id)"
						/>
					</template>
				</template>
			</Table>
		</template>
	</Page>
</template>
