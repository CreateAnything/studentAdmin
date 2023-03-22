<script setup lang="ts">
import { ref } from 'vue';
import Add from './add/index.vue';
import useStudent from './useStudent';
const addRef = ref<typeof Add | null>(null);
const { config, formState, Colums, studentList, loading, deleteStudent } =
	useStudent();
const onAdd = () => {
	addRef.value && addRef.value.openModel();
};
</script>
<template>
	<Page :showHead="true" v-loading="loading">
		<template #head>
			<Search :conifg="config" :modelValue="formState" />
		</template>
		<template #main>
			<Add ref="addRef" />
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
							<a-button type="primary" size="small"
								>编辑</a-button
							>
							<confirm
								@confirm="deleteStudent(record.id)"
							/>
						</template>
					</template>
				</a-table>
			</a-card>
		</template>
	</Page>
</template>
<style scoped lang="less"></style>
