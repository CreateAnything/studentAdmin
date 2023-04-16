import { MenuTree } from '@/views/admin/authority/menu/type';
import { FormState } from 'type';
import { Component } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import myMessage from './message';
import { TreeConfig, UseTreeFnType } from './type';
//获取map对象的前一个对象
export const findPreMap = <K, V>(
	map: Map<K, V>,
	target: K
): [K, V] | null => {
	const emtriesArray = Array.from(map.entries());
	const targetIndex = emtriesArray.findIndex(([key]) => key === target);
	return targetIndex > 0 ? emtriesArray[targetIndex - 1] : null;
};
//全局消息
export const createMessage = () => {
	return myMessage.getInstance();
};
//将一个对象的key复制给另一个对象
export const mergeObject = (target: FormState, sourse: FormState) => {
	for (const key in target) {
		target[key] = sourse[key];
	}
};
//将路径进行转化
export const GetPath = (roleName: string, key: string): string => {
	let result = '';
	const childPath = key.replace('_', '/');
	result = `../views/${roleName}/${childPath}/index.vue`;
	return result;
};

//将菜单变成路由routes
export const GetRoutesByMenu = (
	menu: MenuTree[],
	modules: Record<string, Component>,
	type: string
): RouteRecordRaw[] => {
	return menu.map((menuItem: MenuTree) => {
		const { children, url, name, icon } = menuItem;
		const modulePath = GetPath(type, menuItem.keyd);
		const hasChild = children && children.length > 0;
		const routes: RouteRecordRaw = {
			path: url,
			name,
			meta: {
				title: menuItem.name,
				icon,
				Auth: true,
				isMenu: menuItem.isMenu,
			},
			component: modules[modulePath],
		};
		if (hasChild) {
			routes.component = () =>
				import('../components/commmon/ParentView/index.vue');
		}
		if (hasChild)
			routes.children = GetRoutesByMenu(
				children,
				modules,
				type
			) as never;
		return routes;
	});
};
//将菜单变成tree
export const GetListToTree = (config: TreeConfig): MenuTree[] => {
	const {
		data,
		parentKey = 'parentId',
		idKey = 'id',
		sortKey = 'sort',
	} = config;
	const tree: MenuTree[] = [];
	const treeMap = data.reduce((pre, next) => {
		next.children = [];
		pre[next[idKey]] = next;
		return pre;
	}, {});
	for (let i = 0; i < data.length; i++) {
		const menu = treeMap[data[i][parentKey]];
		if (menu) {
			menu.children.push(data[i]);
			menu.children = menu.children.sort(
				(a: any, b: any) => a[sortKey] - b[sortKey]
			);
		} else {
			tree.push(data[i]);
		}
	}
	return tree.sort((a: any, b: any) => a[sortKey] - b[sortKey]);
};

//递归获取tree的每一项
export const mapTreeMenu = (
	menus: MenuTree[],
	callback: (menu: MenuTree) => void
) => {
	menus.forEach((menu) => {
		callback(menu);
		if (menu.children && menu.children.length > 0) {
			mapTreeMenu(menu.children, callback);
		}
	});
};

//获取面包屑
export const createMenuKeyMap: UseTreeFnType = (root) => {
	return function (tree: MenuTree[] = root, Map = {}) {
		return tree.reduce((pre, next) => {
			if (!Map[next.url]) {
				Map[next.url] = [];
			}
			pre[next.url] = getTreeNameArrayById(root, next.id);
			if (next.children && next?.children.length > 0) {
				const deep = createMenuKeyMap(root);
				deep(next.children, Map);
			}
			return pre;
		}, Map);
	};
};

//根据id获取树状数据子内名称
function getTreeNameArrayById(tree: MenuTree[], Id: number): string[] {
	const breadcrumb: string[] = [];
	const deepPreNode = (arr: MenuTree[], id: number) => {
		arr.map((item: MenuTree) => {
			if (item.id == id) {
				breadcrumb.unshift(item.name);
				deepPreNode(tree, item.parentId!);
			} else if (item.children && item.children.length > 0) {
				deepPreNode(item.children, id);
			}
		});
	};
	deepPreNode(tree, Id);
	return breadcrumb;
}

//将树变成list
//树状解构转列表
export function getTreeToList<T extends MenuTree>(data: T[]): T[] {
	const res: T[] = [];
	const deep = (tree: T[]): void => {
		for (let i = 0; i < tree.length; i++) {
			const treeItem: T = tree[i];
			res.push(treeItem);
			if (treeItem.children && treeItem.children.length > 0) {
				res.concat(treeItem.children as T[]);
				deep(treeItem.children as T[]);
			}
		}
	};
	deep(data);
	return res;
}
export const levelMapTree = <T extends { left: T; right: T }>(
	root: T
) => {
	const res: T[] = [];
	if (!root) return res;
	const queue = [root];
	while (queue.length) {
		const arr: never[] | T = [];
		const len = queue.length;
		for (let i = 0; i < len; i++) {
			const node = queue.shift();
			if (node !== undefined) {
				node.left && queue.push(node.left);
				node.right && queue.push(node.right);
			}
		}
		res.push(arr as never);
	}
	return res;
};

//将数组分成指定数目的二维数组
export const SliceArr = (arr: any[], size: number) => {
	const newArr = [];
	const len = arr.length;
	const lineNum = len % size === 0 ? len / size : Math.ceil(len / size);
	for (let i = 0; i < lineNum; i++) {
		const Item = arr.slice(i * size, (i + 1) * size);
		newArr.push(Item);
	}
	return newArr;
};
