<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue';
import { Rule } from 'ant-design-vue/lib/form';
import { ref } from 'vue';
import { addStudent } from '../request';
import { StudentForm } from '../type';
const rules: Record<string, Rule[]> = {
	name: [
		{
			required: true,
			trigger: 'change',
			message: '请输入学生姓名',
		},
	],
	className: [
		{
			required: true,
			trigger: 'change',
			message: '请输入学生班级',
		},
	],
};

const visible = ref<boolean>();
const formInstance = ref<FormInstance>();
const formState = ref<StudentForm>({
	className: '',
	sex: '男',
	name: '',
	department: '',
	birthDay: '',
});

const handleSubmit = async () => {
	await addStudent(formState.value);
};

const handleCancle = () => {
	formInstance.value?.resetFields();
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
	<a-modal
		v-model:visible="visible"
		title="学生新增"
		:width="1000 + 'px'"
		@cancel="handleCancle"
		@ok="handleSubmit"
	>
		<a-form
			:model="formState"
			name="basic"
			ref="studentformRef"
			:label-col="{ span: 6 }"
			:wrapper-col="{ span: 24 }"
			:rules="rules"
			labelAlign="right"
			autocomplete="off"
		>
			<a-row :gutter="[16, 16]">
				<a-col :span="6">
					<a-form-item label="姓名" name="name">
						<a-input
							v-model:value="formState.name"
							placeholder="请输入学生姓名"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="班级" name="className">
						<a-input
							v-model:value="formState.className"
							placeholder="请输入学生班级"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="部门" name="department">
						<a-input
							v-model:value="formState.department"
							placeholder="请输入学生部门"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="性别" name="sex">
						<a-select
							v-model:value="formState.sex"
							placeholder="请选择学生性别"
						>
							<a-select-option value="男"
								>男</a-select-option
							>
							<a-select-option value="女"
								>女</a-select-option
							>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="生日" name="birthDay">
						<a-date-picker
							style="width: 100%"
							placeholder="请选择出生日期"
							v-model:value="formState.birthDay"
						/>
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
	</a-modal>
</template>
