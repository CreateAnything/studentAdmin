<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import Modal from '_ant-design-vue@3.2.15@ant-design-vue/es/modal/Modal';
import { TableColumnProps } from 'ant-design-vue';
import { computed, createVNode, ref } from 'vue';
import {
	ScoreDots,
	StudentItem,
	TableSourse,
	UpdateScoreForm,
} from '../type';
const props = defineProps<{
	data: StudentItem[];
	colums: TableColumnProps<StudentItem>[];
}>();
const emit = defineEmits<{
	(e: 'submit', payload: UpdateScoreForm[]): void;
}>();
const Min = 0;
const Max = 100;
const visible = ref<boolean>(false);
const sourse = ref<TableSourse[]>([]);
const user = useUserStore();
const courseId = user.userInfo.teacher?.courseId as string;
const cname = user.userInfo.teacher?.cname;
const getCourseName = computed(() => {
	return user.userInfo.teacher?.cname;
});

const oncancel = () => {
	visible.value = false;
	sourse.value = [];
};

const openModal = () => {
	visible.value = true;
	sourse.value = props.data.map((item) => {
		const scoreDots = findScore(item.scoreDtos);
		return {
			courseId: parseInt(courseId),
			score: scoreDots?.score || 0,
			studentId: item.id,
			name: item.name,
			clazzName: item.clazzName,
			cname,
		};
	});
};
const findScore = (item: ScoreDots[]): ScoreDots | undefined => {
	return item.find((it) => it.courseId === parseInt(courseId));
};

const onSubmit = () => {
	Modal.confirm({
		title: '您确定要修改该课程的成绩吗?',
		icon: createVNode(ExclamationCircleOutlined),
		onOk() {
			const payload: UpdateScoreForm[] = sourse.value.map(
				({ score, studentId, courseId }) => ({
					score,
					studentId,
					courseId,
				})
			);
			emit('submit', payload);
			visible.value = false;
		},
	});
};

const format = (value: string) => {
	const intValue = parseInt(value, 10);
	if (isNaN(intValue)) {
		return '';
	} else if (intValue >= Max) {
		return Max;
	} else {
		return '' + intValue;
	}
};

const parse = (value: string) => {
	const intValue = parseInt(value, 10);
	if (isNaN(intValue) || intValue < 1) {
		return Min;
	} else if (intValue >= Max) {
		return Max;
	} else {
		return intValue;
	}
};
defineExpose({
	openModal,
});
</script>
<template>
	<a-modal
		:visible="visible"
		:width="1000"
		@cancel="oncancel"
		@ok="onSubmit"
	>
		<a-table
			style="height: 100%"
			:columns="colums"
			:data-source="sourse"
			:pagination="false"
		>
			<template #bodyCell="{ column, record }">
				<template v-if="column.key === 'cname'">
					<span>{{ getCourseName }}</span>
				</template>
				<template v-if="column.key === 'action'">
					<a-input-number
						style="width: 100%"
						placeholder="请输入分数"
						:min="Min"
						:max="Max"
						:formatter="(format as any)"
						:parser="parse"
						v-model:value="record.score"
					/>
				</template>
			</template>
		</a-table>
	</a-modal>
</template>
