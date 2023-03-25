<script setup lang="ts">
import DescHead from '@/components/commmon/descHead/index.vue';
import ModelFrom from '@/components/commmon/modelForm/index.vue';
import Page from '@/components/commmon/page/index.vue';
import useClass from './useClass';
const {
	loading,
	configs,
	colums,
	classList,
	modelRef,
	stateForm,
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
			<a-card>
				<ModelFrom
					v-model:state="stateForm"
					ref="modelRef"
					@submit="onSubmit"
					:config="configs"
				/>
				<template #extra>
					<a-button type="primary" @click="onAdd"
						>新增</a-button
					>
				</template>
				<a-table
					style="height: 100%"
					:columns="colums"
					:data-source="classList"
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
								@confirm="() => removeClass(record.id)"
							/>
						</template>
					</template>
				</a-table>
			</a-card>
		</template>
	</Page>
</template>
