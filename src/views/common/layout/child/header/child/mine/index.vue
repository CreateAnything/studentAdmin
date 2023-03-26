<script setup lang="ts">
import ModelForm from '@/components/commmon/modelForm/index.vue';
import { usePremissionStore } from '@/store/premission';
import { useUserStore } from '@/store/user';
import { CaretDownOutlined, UserOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createModelConfig } from './config';
import PersonModel from './personModel/index.vue';
const user = useUserStore();
const premission = usePremissionStore();
const router = useRouter();
type DropListItem = {
	name: string;
	url?: string;
	Fn: () => void;
};
type Form = {
	beforePassword: string;
	password: string;
	confirmPassword: string;
};
const personModel = ref<typeof PersonModel>();
const modelRef = ref<typeof ModelForm>();
const config = createModelConfig();
const formState = ref<Form>({
	beforePassword: '',
	password: '',
	confirmPassword: '',
});

const PersonMessageHandle = () => {
	personModel.value?.openModel();
};
const UpdatePasswordHandle = () => {
	modelRef.value?.openModel(false);
};
const ExitLoginHandle = () => {
	user.$reset();
	premission.$reset();
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
	<div>
		<ModelForm
			ref="modelRef"
			:config="config"
			title="修改密码"
			v-model:state="formState"
		/>
		<PersonModel ref="personModel" />
		<a-dropdown placement="bottom">
			<div class="ant-dropdown-link" @click.prevent>
				<div class="userinfo">
					<span class="user-icon"><user-outlined /></span>
					<span class="username">{{
						user.userInfo.username
					}}</span>
					<span class="down-icon">
						<caret-down-outlined
					/></span>
				</div>
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
	</div>
</template>
<style lang="less" scoped>
.avatar {
	background-color: @theme-color;
}
.userinfo {
	color: @theme-color;
	margin: 0 3px 0 5px;
	font-size: 14px;
	text-decoration: underline;
	.username {
		font-weight: 600;
		letter-spacing: 0.05em;
	}
	.user-icon {
		font-size: @text-size-media;
		margin-right: 3px;
	}
	.down-icon {
		font-size: @text-size-small;
	}
}
</style>
