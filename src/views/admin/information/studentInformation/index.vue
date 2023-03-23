<script setup lang="ts">
import { ref } from 'vue';
import Add from './add/index.vue';
import useStudent from './useStudent';
const addCompnentRef = ref();
const {
	config,
	formState,
	Colums,
	studentList,
	loading,
	removeStudent,
	onAdd,
	onAddStudentEvent,
	onEdit,
} = useStudent(addCompnentRef);
</script>
<template>
	<Page :showHead="true" v-loading="loading">
		<template #head>
			<Search :conifg="config" :modelValue="formState" />
		</template>
		<template #main>
			<Add ref="addCompnentRef" @submit="onAddStudentEvent" />
			<a-card title="学生信息展示">
				<template #extra>
					<a-button type="primary" @click="onAdd"
						>新增</a-button
					>
				</template>
				<a-table
					style="height: 100%"
					:columns="Colums"
					:data-source="studentList"
				>
					<template #bodyCell="{ column, record }">
						<template v-if="column.key == 'action'">
							<a-button
								type="primary"
								size="small"
								@click="onEdit(record.id)"
								>编辑</a-button
							>
							<confirm
								@confirm="() => removeStudent(record.id)"
							/>
						</template>
					</template>
				</a-table>
			</a-card>
		</template>
	</Page>
</template>
<style scoped lang="less"></style>
