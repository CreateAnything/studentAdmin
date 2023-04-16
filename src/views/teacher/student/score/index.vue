<script setup lang="ts">
import DescHead from '@/components/commmon/descHead/index.vue';
import Page from '@/components/commmon/page/index.vue';
import { ref } from 'vue';
import { ModelColums, createTableConfig } from './config';
import ModalScore from './model/index.vue';
import useScore from './useScore';
const modalRef = ref<typeof ModalScore>();
const tableConfig = createTableConfig();
const {
	loading,
	studentList,
	getCourseName,
	getScore,
	onUpdateScore,
	onExport,
} = useScore();
const openModal = () => {
	modalRef.value?.openModal();
};
</script>

<template>
	<Page :show-head="true" v-loading="loading">
		<template #head>
			<DescHead title="学生成绩管理">
				<template #body>一个用户学生成绩管理的模块</template>
			</DescHead>
		</template>
		<template #main>
			<ModalScore
				:data="studentList"
				:colums="ModelColums"
				ref="modalRef"
				@submit="onUpdateScore"
			/>
			<Table
				:config="tableConfig"
				:loading="loading"
				:sourse="studentList"
			>
				<template #extra>
					<a-button type="primary" @click="openModal"
						>打分</a-button
					>
					<a-button
						type="primary"
						@click="onExport"
						class="export"
						>导出</a-button
					>
				</template>
				<template v-slot:bodyCell="{ scope }">
					<template v-if="scope.column.dataIndex === 'cname'">
						<span>{{ getCourseName }}</span>
					</template>
					<template v-if="scope.column.dataIndex === 'score'">
						<span>{{
							getScore(scope.record.scoreDtos)
						}}</span>
					</template>
				</template>
			</Table>
		</template>
	</Page>
</template>
<style scoped lang="less">
.export {
	margin: 0 10px;
}
</style>
