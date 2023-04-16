<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const onBack = () => {
	router.back();
};
</script>
<template>
	<div class="netWorkErr">
		<a-card style="width: 100%; height: 100%">
			<a-result
				status="500"
				title="500"
				sub-title="Sorry, the server is wrong."
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
.netWorkErr {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
