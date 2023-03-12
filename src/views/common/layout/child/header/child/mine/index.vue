<script setup lang="ts">
import { DownOutlined, UserOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
const router = useRouter();
type DropListItem = {
	name: string;
	url?: string;
	Fn: () => void;
};
const PersonMessageHandle = () => {
	console.log('我');
};

const UpdatePasswordHandle = () => {
	console.log('修改密码');
};

const ExitLoginHandle = () => {
	router.push('/login');
};
const dropList: DropListItem[] = [
	{
		name: '个人信息',
		Fn: PersonMessageHandle,
	},
	{
		name: '修改密码',
		Fn: UpdatePasswordHandle,
	},
	{
		name: '退出登录',
		Fn: ExitLoginHandle,
	},
];
</script>
<template>
	<a-dropdown placement="bottom">
		<div class="ant-dropdown-link" @click.prevent>
			<a-avatar class="icon-size avatar">
				<template #icon><UserOutlined /></template>
			</a-avatar>
			<span class="username">admin</span>
			<DownOutlined />
		</div>
		<template #overlay>
			<a-menu>
				<a-menu-item
					v-for="(item, index) in dropList"
					:key="index"
				>
					<span @click="item.Fn">{{ item.name }}</span>
				</a-menu-item>
			</a-menu>
		</template>
	</a-dropdown>
</template>
<style lang="less" scoped>
.avatar {
	background-color: @theme-color;
}
.username {
	color: @theme-color;
	margin: 0 3px 0 5px;
	text-decoration: underline;
	font-weight: 600;
}
</style>
