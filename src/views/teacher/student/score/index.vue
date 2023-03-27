<script setup lang="ts">
import DescHead from '@/components/commmon/descHead/index.vue';
import Page from '@/components/commmon/page/index.vue';
import { ref } from 'vue';
import { Colums, ModelColums } from './config';
import ModalScore from './model/index.vue';
import useScore from './useScore';
const modalRef = ref<typeof ModalScore>();
const { loading, studentList, getCourseName, getScore, onUpdateScore } =
	useScore();
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
			<a-card :loading="loading">
				<template #extra>
					<a-button type="primary" @click="openModal"
						>打分</a-button
					>
				</template>
				<a-table
					style="height: 100%"
					:columns="Colums"
					:data-source="studentList"
				>
					<template #bodyCell="{ column, record }">
						<template v-if="column.key === 'cname'">
							<span>{{ getCourseName }}</span>
						</template>
						<template v-if="column.key === 'score'">
							<span>{{ getScore(record.scoreDtos) }}</span>
						</template>
					</template>
				</a-table>
			</a-card>
		</template>
	</Page>
</template>
