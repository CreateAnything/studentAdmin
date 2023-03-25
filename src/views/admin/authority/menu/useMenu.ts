import {
	FormItem,
	ModelExpose,
} from '@/components/commmon/modelForm/form/type';
import { GetListToTree } from '@/utils';
import { onMounted, ref } from 'vue';
import { Roels } from '../user/type';
import { createModelConfig } from './config';
import {
	addMenu,
	editMenu,
	findAllMenuList,
	removeMenu,
} from './request';
import { MenuForm, MenuItem, MenuTree } from './type';
const useMenu = () => {
	const loading = ref<boolean>(false);
	const visible = ref<boolean>(false);
	const isEdit = ref<boolean>(false);
	const activeKey = ref<Roels>(Roels.Admin);
	const modelRef = ref<ModelExpose>();
	const menuList = ref<MenuItem[]>([]);
	const modelConfig = ref<FormItem[]>([]);
	const nodeList = ref<MenuTree[]>([]);
	const menuForm = ref<MenuForm>({
		name: '',
		isLink: 0,
		isMenu: 0,
		enable: 0,
		parentId: undefined,
		icon: '',
		sort: 0,
		description: '',
		roleId: Roels.Admin,
		url: '',
		keyd: '',
	});
	const menuTree = ref<Partial<MenuTree>[]>([
		{
			name: '菜单管理',
			children: [],
			id: '000000',
			keyd: 'root',
		},
	]);
	const onOpenModel = () => {
		isEdit.value = false;
		modelRef.value?.openModel(isEdit.value);
	};

	const onDelete = async (id: number) => {
		await removeMenu([id]);
		init();
	};

	const onSubmit = async () => {
		if (!isEdit.value) {
			await addMenu(menuForm.value);
		} else {
			await editMenu(menuForm.value);
		}
		init();
	};

	const onEdit = (payload: MenuItem) => {
		isEdit.value = true;
		modelRef.value?.openModel(isEdit.value, payload);
	};

	const init = async () => {
		loading.value = true;
		menuList.value = await findAllMenuList();
		const treeList = GetListToTree({ data: menuList.value });
		menuTree.value[0].children = treeList;
		modelConfig.value = createModelConfig(
			menuTree.value as MenuTree[]
		);
		nodeList.value = treeList;
		loading.value = false;
	};

	onMounted(() => {
		init();
	});

	return {
		modelRef,
		menuForm,
		menuTree,
		loading,
		nodeList,
		activeKey,
		visible,
		modelConfig,
		menuList,
		onSubmit,
		onEdit,
		onOpenModel,
		onDelete,
	};
};

export default useMenu;
