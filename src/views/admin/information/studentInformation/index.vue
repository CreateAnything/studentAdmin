<script setup lang="ts">
import DescHead from '@/components/commmon/descHead/index.vue';
import { ref } from 'vue';
import Add from './add/index.vue';
import useStudent from './useStudent';
const addCompnentRef = ref();
const {
	tableConfig,
	loading,
	studentList,
	removeStudent,
	onAdd,
	onAddStudentEvent,
	onEdit,
} = useStudent(addCompnentRef);
</script>
<template>
	<Page :showHead="true" v-loading="loading">
		<template #head>
			<DescHead title="学生管理">
				<template #body>一个用户管理学生信息的模块</template>
			</DescHead>
		</template>
		<template #main>
			<Add ref="addCompnentRef" @submit="onAddStudentEvent" />
			<Table
				:config="tableConfig"
				:loading="loading"
				@add="onAdd"
				:sourse="studentList"
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
							@confirm="
								() => removeStudent(scope.record.id)
							"
						/>
					</template>
				</template>
			</Table>
		</template>
	</Page>
</template>
<style scoped lang="less"></style>
