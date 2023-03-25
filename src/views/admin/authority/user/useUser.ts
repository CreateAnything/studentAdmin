import {
	FormItem,
	ModelExpose,
} from '@/components/commmon/modelForm/form/type';
import { TableColumnsType } from 'ant-design-vue';
import { ValidatorRules } from 'global';
import { computed, onMounted, ref } from 'vue';
import { createColums, createModelConfig } from './config';
import { addUser, editUser, findAllUser, removeUser } from './request';
import { Roels, User, UserForm } from './type';
const useUser = () => {
	const loading = ref<boolean>(false);
	const isEdit = ref<boolean>(false);
	const modelRef = ref<ModelExpose>();
	const TableColums = ref<TableColumnsType>([]);
	const ModelConfig = ref<FormItem[]>([]);
	const userList = ref<User[]>([]);
	const userForm = ref<UserForm>({
		userName: '',
		password: '',
		confirmPassword: '',
		roleId: 1,
		isEnabled: 0,
		createUser: '',
	});
	const formatRole = computed(() => {
		return (id: number) => {
			return id === Roels.Admin
				? '管理员'
				: id === Roels.Student
				? '学生'
				: '教师';
		};
	});

	const validatePassword: ValidatorRules = (_rule, value) => {
		return value === ''
			? Promise.reject('请确认密码')
			: userForm.value.password !== value
			? Promise.reject('两次密码输入不一样')
			: Promise.resolve();
	};

	const onOpenModel = () => {
		isEdit.value = false;
		modelRef.value?.openModel(isEdit.value);
	};

	const onSubmit = async () => {
		if (!isEdit.value) {
			await addUser(userForm.value);
		} else {
			await editUser(userForm.value);
		}
		init();
	};

	const onEdit = (payload: UserForm) => {
		isEdit.value = true;
		modelRef.value?.openModel(isEdit.value, payload);
	};

	const onRemove = async (id: number) => {
		await removeUser([id]);
		init();
	};

	const init = async () => {
		loading.value = true;
		userList.value = await findAllUser();
		TableColums.value = createColums();
		ModelConfig.value = createModelConfig({
			validator: {
				confirmPassword: validatePassword,
			},
		});
		loading.value = false;
	};

	onMounted(() => {
		init();
	});
	return {
		loading,
		userForm,
		TableColums,
		userList,
		ModelConfig,
		formatRole,
		modelRef,
		onOpenModel,
		onSubmit,
		onEdit,
		onRemove,
	};
};

export default useUser;
