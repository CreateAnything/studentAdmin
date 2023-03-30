<script setup lang="ts">
import DescHead from '@/components/commmon/descHead/index.vue';
import Page from '@/components/commmon/page/index.vue';
import useTacherCourse from './useTacherCourse';
const { course } = useTacherCourse();
</script>

<template>
	<Page :show-head="true">
		<template #head>
			<DescHead title="老师课程信息管理">
				<template #body>一个管理老师课程信息模块</template>
			</DescHead>
		</template>
		<template #main> </template>
	</Page>
</template>
