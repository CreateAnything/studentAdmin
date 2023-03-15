<script setup lang="ts">
import { TreeSelectProps } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { MenuItem } from 'global';
import { reactive, toRefs } from 'vue';
interface Props {
	visible: boolean;
	width?: number;
	treeData: Partial<MenuItem>[];
}
type Form = Omit<MenuItem, 'children' | 'id'>;
const props = withDefaults(defineProps<Props>(), {
	width: 1000,
});
const emits = defineEmits<{
	(e: 'cancel'): void;
}>();

const { visible, width, treeData } = toRefs(props);
const fieldNames: TreeSelectProps['fieldNames'] = {
	label: 'name',
	children: 'children',
	value: 'key',
};
const rules: Record<string, Rule[]> = {
	name: [
		{
			required: true,
			trigger: 'change',
			message: '菜单名称不能为空',
		},
	],
	key: [
		{
			required: true,
			trigger: 'change',
			message: '菜单key不能为空',
		},
	],
};
const formState = reactive<Form>({
	parentId: '',
	path: '',
	icon: '',
	isLink: false,
	isMenu: true,
	key: '',
	order: 0,
	enable: true,
	name: '',
});

const submitForm = () => {
	console.log('as');
};
const hanCancel = () => {
	emits('cancel');
};
</script>
<template>
	<div>
		<a-modal
			v-model:visible="visible"
			title="新增菜单"
			:width="width"
			@ok="submitForm"
			@cancel="hanCancel"
		>
			<a-form
				:model="formState"
				name="basic"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 24 }"
				:rules="rules"
				labelAlign="right"
				autocomplete="off"
			>
				<a-row :gutter="24">
					<a-col :span="8">
						<a-form-item label="菜单名称" name="name">
							<a-input
								v-model:value="formState.name"
								placeholder="请输入菜单名称"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="跳转路径" name="path">
							<a-input
								v-model:value="formState.path"
								placeholder="请输入跳转路径"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="菜单key" name="key">
							<a-input
								v-model:value="formState.key"
								placeholder="请输入菜单key"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="菜单图标" name="icon">
							<a-input
								v-model:value="formState.icon"
								placeholder="请输入菜单图标"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="菜单排序" name="order">
							<a-input
								v-model:value="formState.order"
								placeholder="请输入菜单排序"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="父级菜单" name="parentId">
							<a-tree-select
								v-model:value="formState.parentId"
								show-search
								style="width: 100%"
								placeholder="请选择父级菜单"
								:dropdown-style="{
									maxHeight: '400px',
									overflow: 'auto',
								}"
								allow-clear
								tree-default-expand-all
								:tree-data="treeData"
								:field-names="fieldNames"
							>
							</a-tree-select>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="24">
					<a-col :span="8">
						<a-form-item label="是否链接" name="isLink">
							<a-switch
								v-model:checked="formState.isLink"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="是否菜单" name="isMenu">
							<a-switch
								v-model:checked="formState.isMenu"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="是否启用" name="enable">
							<a-switch
								v-model:checked="formState.enable"
							/>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="24">
					<a-col :span="24">
						<a-form-item
							label="菜单描述"
							name="description"
							:label-col="{ span: 2 }"
						>
							<a-textarea
								v-model:value="formState.description"
								placeholder="请输入菜单描述"
								:rows="4"
							/>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</a-modal>
	</div>
</template>
