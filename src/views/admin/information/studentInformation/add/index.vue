<script setup lang="ts">
import { Student, StudentForm } from '../type';
import useAdd from './useAdd';
const emit = defineEmits<{
	(e: 'submit', payload: StudentForm, type: boolean): void;
}>();
const {
	validateInfos,
	visible,
	formState,
	dateFormat,
	classList,
	departmentList,
	courseList,
	isEdit,
	resetFields,
	validate,
} = useAdd();

//点击取消
const handleCancle = () => {
	resetFields();
	visible.value = false;
};

//提交
const handleSubmit = () => {
	validate().then(() => {
		emit('submit', formState.value, isEdit.value);
		handleCancle();
	});
};
//打开Model
const openModel = (type: boolean, payload: Student) => {
	isEdit.value = type;
	if (payload) {
		formState.value.classId = payload.classId;
		formState.value.courseIds = JSON.parse(payload.courseIds!);
		formState.value.departmentId = payload.departmentId;
		formState.value.name = payload.name;
		formState.value.password = payload.password;
		formState.value.sex = payload.sex;
		formState.value.birthday = payload.birthday;
	}
	visible.value = true;
};

defineExpose({
	openModel,
});
</script>
<template>
	<a-modal
		v-model:visible="visible"
		:title="!isEdit ? '新增学生' : '编辑学生'"
		:width="1000 + 'px'"
		@cancel="handleCancle"
		@ok="handleSubmit"
	>
		<a-form
			:model="formState"
			name="basic"
			:label-col="{ span: 6 }"
			:wrapper-col="{ span: 24 }"
			labelAlign="right"
			autocomplete="off"
		>
			<a-row :gutter="[16, 16]">
				<a-col :span="6">
					<a-form-item label="姓名" v-bind="validateInfos.name">
						<a-input
							v-model:value="formState.name"
							placeholder="请输入学生姓名"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item
						label="密码"
						v-bind="validateInfos.password"
					>
						<a-input
							type="password"
							v-model:value="formState.password"
							placeholder="请输入学生姓名"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item
						label="班级"
						v-bind="validateInfos.classId"
					>
						<a-select
							v-model:value="formState.classId"
							placeholder="请选择学生部门"
						>
							<a-select-option
								v-for="item in classList"
								:key="item.id"
								:value="item.id"
							>
								{{ item.clazzName }}
							</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item
						label="部门"
						v-bind="validateInfos.departmentId"
					>
						<a-select
							v-model:value="formState.departmentId"
							placeholder="请选择学生部门"
						>
							<a-select-option
								v-for="item in departmentList"
								:key="item.id"
								:value="item.id"
							>
								{{ item.name }}
							</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item
						label="课程"
						v-bind="validateInfos.courseIds"
					>
						<a-select
							v-model:value="formState.courseIds"
							placeholder="请选择课程"
							mode="multiple"
							:max-tag-count="1"
						>
							<a-select-option
								v-for="item in courseList"
								:key="item.id"
								:value="item.id"
							>
								{{ item.name }}
							</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="性别" v-bind="validateInfos.sex">
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
					<a-form-item
						label="生日"
						v-bind="validateInfos.birthday"
					>
						<a-date-picker
							style="width: 100%"
							:format="dateFormat"
							placeholder="请选择出生日期"
							:value-format="dateFormat"
							v-model:value="formState.birthday"
						/>
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
	</a-modal>
</template>
