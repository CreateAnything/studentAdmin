<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const user = useUserStore();
const { userInfo } = storeToRefs(user);
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
			v-if="user.isTeacher"
			:column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
		>
			<a-descriptions-item label="姓名">{{
				userInfo.teacher?.name
			}}</a-descriptions-item>
			<a-descriptions-item label="角色">{{
				user.roleName
			}}</a-descriptions-item>
			<a-descriptions-item label="性别">{{
				userInfo.teacher?.sex
			}}</a-descriptions-item>
			<a-descriptions-item label="生日">
				{{ userInfo.teacher?.birthday }}
			</a-descriptions-item>
			<a-descriptions-item label="管辖班级">
				{{ userInfo.teacher?.clazzName }}
			</a-descriptions-item>
			<a-descriptions-item label="所任课程">
				{{ userInfo.teacher?.cname }}
			</a-descriptions-item>
		</a-descriptions>
		<a-descriptions
			title="User Info"
			v-if="user.isStudent"
			:column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
		>
			<a-descriptions-item label="姓名">{{
				userInfo.student?.name
			}}</a-descriptions-item>
			<a-descriptions-item label="角色">{{
				user.roleName
			}}</a-descriptions-item>
			<a-descriptions-item label="性别">{{
				userInfo.student?.sex
			}}</a-descriptions-item>
			<a-descriptions-item label="生日">
				{{ userInfo.student?.birthday }}
			</a-descriptions-item>
			<a-descriptions-item label="班级">
				{{ userInfo.student?.clazzName }}
			</a-descriptions-item>
			<a-descriptions-item label="院系">
				{{ userInfo.student?.dname }}
			</a-descriptions-item>
			<a-descriptions-item label="课程"> 未知 </a-descriptions-item>
		</a-descriptions>
		<a-descriptions
			title="User Info"
			v-if="user.isAdmin"
			:column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
		>
			<a-descriptions-item label="角色">{{
				user.roleName
			}}</a-descriptions-item>
		</a-descriptions>
	</a-modal>
</template>
