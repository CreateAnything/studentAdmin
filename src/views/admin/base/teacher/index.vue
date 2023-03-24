<script setup lang="ts">
import DescHead from '@/components/commmon/descHead/index.vue';
import { FormItem } from '@/components/commmon/modelForm/form/type';
import ModelForm from '@/components/commmon/modelForm/index.vue';
import Page from '@/components/commmon/page/index.vue';
import { onMounted, ref } from 'vue';
import { Colums, createModelConfig } from './config';
import useTeacher from './useTeacher';
const config = ref<FormItem[]>([]);
const {
	loading,
	teacherList,
	classList,
	onEdit,
	modelRef,
	onRemove,
	onAdd,
	teacherForm,
} = useTeacher();

onMounted(() => {
	console.log(classList.value);
	config.value = createModelConfig(classList.value);
});
</script>

<template>
	<Page :show-head="true" v-loading="loading">
		<template #head>
			<DescHead title="教师管理">
				<template #body>用于教师的增删改查模块</template>
			</DescHead>
		</template>
		<template #main>
			<a-card>
				<ModelForm
					ref="modelRef"
					v-model:state="teacherForm"
					:config="config"
				/>
				<template #extra>
					<a-button type="primary" @click="onAdd"
						>新增</a-button
					>
				</template>
				<a-table
					style="height: 100%"
					:columns="Colums"
					:data-source="teacherList"
				>
					<template #bodyCell="{ column, record }">
						<template v-if="column.key == 'action'">
							<a-button
								type="primary"
								size="small"
								@click="() => onEdit(record.id)"
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
