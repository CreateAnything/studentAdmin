<script setup lang="ts">
import DescHead from '@/components/commmon/descHead/index.vue';
import Page from '@/components/commmon/page/index.vue';
import Table from '@/components/commmon/table/index.vue';
import { TableConfig } from '@/components/commmon/table/type';
import { MyRequest } from '@/request';
import { useUserStore } from '@/store/user';
import { onMounted, ref } from 'vue';
import { createTableConfig } from './config';
const user = useUserStore();
const id = user.userInfo.student?.id;
const scoreList = ref<any[]>([]);
const loading = ref<boolean>(true);
const config = ref<TableConfig>();
const init = async () => {
	loading.value = true;
	scoreList.value = await MyRequest.get({
		url: '/studentmanager/student/score' + '/' + id,
	});
	config.value = createTableConfig();
	loading.value = false;
};
onMounted(() => {
	init();
});
</script>

<template>
	<Page :show-head="true" v-loading="loading">
		<template #head>
			<DescHead title="成绩查看">
				<template #body>查看学生各科成绩</template>
			</DescHead>
		</template>
		<template #main>
			<Table
				:config="config"
				:loading="loading"
				:sourse="scoreList"
			>
				<template v-slot:bodyCell="{ scope }">
					<div v-if="scope.column.dataIndex === 'abc'">
						asas
					</div>
				</template>
			</Table>
		</template>
	</Page>
</template>
