<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const onBack = () => {
	router.back();
};
</script>
<template>
	<div class="notFound">
		<a-card style="width: 100%; height: 100%">
			<a-result
				status="404"
				title="404"
				sub-title="Sorry, the page you visited does not exist."
			>
				<template #extra>
					<a-button type="primary" @click="onBack"
						>Back Home</a-button
					>
				</template>
			</a-result>
		</a-card>
	</div>
</template>
<style scoped lang="less">
.notFound {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
