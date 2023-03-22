<script lang="ts" setup>
interface Props {
	okText?: string;
	cancelText?: string;
	title?: string;
}
const props = withDefaults(defineProps<Props>(), {
	okText: 'Yes',
	cancelText: 'No',
	title: '您确定要删除该项吗?',
});
const emit = defineEmits<{
	(e: 'confirm'): void;
	(e: 'cancel'): void;
}>();
const confirm = () => {
	emit('confirm');
};
const cancel = () => {
	emit('cancel');
};
</script>
<template>
	<a-popconfirm
		:title="props.title"
		:ok-text="props.okText"
		:cancel-text="props.cancelText"
		@confirm="confirm"
		@cancel="cancel"
	>
		<slot name="btn">
			<a-button
				style="margin-left: 5px"
				size="small"
				type="primary"
				danger
				>删除</a-button
			>
		</slot>
	</a-popconfirm>
</template>
