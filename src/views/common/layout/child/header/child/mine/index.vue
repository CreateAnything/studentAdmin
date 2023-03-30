<script setup lang="ts">
import ModelForm from '@/components/commmon/modelForm/index.vue';
import { MyRequest } from '@/request/index';
import { useGlobalStore } from '@/store/global';
import { usePremissionStore } from '@/store/premission';
import { useUserStore } from '@/store/user';
import { createMessage } from '@/utils';
import { Roels } from '@/views/admin/authority/user/type';
import { CaretDownOutlined, UserOutlined } from '@ant-design/icons-vue';
import { ValidatorRules } from 'global';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { createModelConfig, createPersonModelConfig } from './config';
import PersonModel from './personModel/index.vue';
const user = useUserStore();
const { userInfo } = storeToRefs(user);
const premission = usePremissionStore();
const router = useRouter();
const global = useGlobalStore();
const message = createMessage();
interface DropListItem {
	name: string;
	url?: string;
	Fn: () => void;
}
interface Form {
	id?: string | number | undefined;
	password: string;
	newPassword: string;
	confirmPassword: string;
}
interface PersonForm {
	birthday: string;
	sex: string;
	id?: string;
}
const personModel = ref<typeof PersonModel>();
const modelRef = ref<typeof ModelForm>();
const personModalRef = ref<typeof ModelForm>();
const personForm = ref<PersonForm>({
	birthday: '',
	sex: '',
});
const formState = ref<Form>({
	password: '',
	newPassword: '',
	confirmPassword: '',
});

const PersonMessageHandle = () => {
	personModel.value?.openModel();
};

const UpdatePasswordHandle = () => {
	modelRef.value?.openModel(false);
};

const UpdatePersonInformation = () => {
	//设置表单默认值
	personForm.value.birthday =
		userInfo.value.student?.birthday ||
		userInfo.value.teacher?.birthday ||
		'2023-3-27';
	personForm.value.sex =
		userInfo.value.student?.sex ||
		userInfo.value.teacher?.sex ||
		'男';
	personModalRef.value?.openModel();
};

const onSubmit = async () => {
	formState.value.id = user.userInfo.userId;
	await MyRequest.patch({
		url: '/studentmanager/user/updatePassword',
		params: formState.value,
	});
	init();
};
const personInfoUpdate = () => {
	userInfo.value.roleId === Roels.Teacher
		? updateTeacherInfo()
		: updateStudentInfo();
};
const DelayBackLogin = (delay = 2000) => {
	setTimeout(() => {
		message.success(
			'更新成功后须重新登陆才能生效,正在跳转登录页面...'
		);
		ExitLoginHandle();
	}, delay);
};

const updateStudentInfo = async () => {
	personForm.value.id = userInfo.value.student?.id as unknown as string;
	await MyRequest.put({
		url: '/studentmanager/student/update',
		data: personForm.value,
	}).finally(() => {
		DelayBackLogin();
	});
};

const updateTeacherInfo = async () => {
	personForm.value.id = userInfo.value.teacher?.id as unknown as string;
	await MyRequest.put({
		url: '/studentmanager/teacher/update',
		data: personForm.value,
	}).finally(() => {
		DelayBackLogin();
	});
};

const ExitLoginHandle = () => {
	user.$reset();
	premission.$reset();
	global.$reset();
	router.push('/login');
};

const confirmPasswordRules: ValidatorRules = (_rule, value) => {
	return value === ''
		? Promise.reject('请确认密码')
		: formState.value.newPassword !== value
		? Promise.reject('两次密码输入不一样')
		: Promise.resolve();
};

const config = createModelConfig<Form>({
	validator: {
		confirmPassword: confirmPasswordRules,
	},
});
const personConfig = createPersonModelConfig();
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
const init = () => {
	if (userInfo.value.roleId !== Roels.Admin) {
		dropList.splice(1, 0, {
			name: '修改信息',
			Fn: UpdatePersonInformation,
		});
	}
};
onMounted(() => {
	init();
});
</script>
<template>
	<div>
		<ModelForm
			ref="modelRef"
			:config="config"
			title="修改密码"
			@submit="onSubmit"
			v-model:state="formState"
		/>
		<PersonModel ref="personModel" />
		<ModelForm
			ref="personModalRef"
			title="修改个人信息"
			@submit="personInfoUpdate"
			v-model:state="personForm"
			:config="personConfig"
		/>
		<a-dropdown placement="bottom">
			<div class="ant-dropdown-link" @click.prevent>
				<div class="userinfo">
					<span class="user-icon"><user-outlined /></span>
					<span class="username">{{ user.userName }}</span>
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
.dropItem {
	font-size: 12px !important;
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
