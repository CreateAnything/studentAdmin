<script lang="ts" setup>
import { ref } from 'vue';
const visible = ref<boolean>(false);
const handleOk = () => {
	visible.value = false;
};
const openModel = () => {
	visible.value = true;
};

defineExpose({
	openModel,
});
</script>
<template>
	<a-modal :width="700" v-model:visible="visible" @ok="handleOk">
		<a-descriptions
			title="User Info"
			:column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
		>
			<a-descriptions-item label="姓名"
				>Zhou Maomao</a-descriptions-item
			>
			<a-descriptions-item label="角色"
				>1810000000</a-descriptions-item
			>
			<a-descriptions-item label="性别"
				>Hangzhou, Zhejiang</a-descriptions-item
			>
			<a-descriptions-item label="生日">empty</a-descriptions-item>
			<a-descriptions-item label="管辖班级">
				asdasdasd
			</a-descriptions-item>
			<a-descriptions-item label="所任课程">
				asdasdasd
			</a-descriptions-item>
			<a-descriptions-item label="个性签名">
				asdasdasd啊实打实
			</a-descriptions-item>
		</a-descriptions>
	</a-modal>
</template>
