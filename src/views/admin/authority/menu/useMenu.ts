import {
	FormItem,
	ModelExpose,
} from '@/components/commmon/modelForm/form/type';
import { GetListToTree } from '@/utils';
import { onMounted, ref } from 'vue';
import { Roels } from '../user/type';
import { createModelConfig, urlPattern } from './config';
import {
	addMenu,
	editMenu,
	findMenuListByRoleId,
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
			id: 0,
			keyd: 'root',
		},
	]);
	const onTabsChange = () => {
		menuForm.value.roleId = activeKey.value;
		init();
	};
	const onOpenModel = () => {
		isEdit.value = false;
		modelRef.value?.openModel(isEdit.value);
	};

	const onDelete = async (id: number) => {
		await removeMenu([id]);
		init();
	};

	const onSubmit = async () => {
		menuForm.value.roleId = activeKey.value;
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

	const onChangeUrl = () => {
		const match = menuForm.value.url.match(urlPattern);
		if (match && match[2]) {
			const path = match[2].substring(1).replace(/\//g, '_');
			menuForm.value.keyd = path;
		}
	};

	const init = async () => {
		loading.value = true;
		menuList.value = await findMenuListByRoleId(activeKey.value);
		const treeList = GetListToTree({ data: menuList.value });
		menuTree.value[0].children = treeList;

		modelConfig.value = createModelConfig<MenuForm>({
			data: { menuTree: menuTree.value },
			enventStack: {
				url: onChangeUrl,
			},
		});
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
		onTabsChange,
		onSubmit,
		onEdit,
		onOpenModel,
		onDelete,
	};
};

export default useMenu;
