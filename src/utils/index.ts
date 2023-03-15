import { MenuItem } from 'global';
import { Component } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { UseTreeFnType } from './type';

//将路径进行转化
export const GetPath = (roleName: string, key: string): string => {
	let result = '';
	const childPath = key.replace('_', '/');
	result = `../views/${roleName}/${childPath}/index.vue`;
	return result;
};

//将菜单变成路由routes
export const GetRoutesByMenu = (
	menu: MenuItem[],
	modules: Record<string, Component>,
	type: string
): RouteRecordRaw[] => {
	return menu.map((menuItem: MenuItem) => {
		const { children, path, name, icon } = menuItem;
		const modulePath = GetPath(type, menuItem.key);
		const hasChild = children && children.length > 0;
		const routes: RouteRecordRaw = {
			path,
			name,
			meta: {
				title: menuItem.name,
				icon,
				isMenu: menuItem.isMenu,
			},
			component: modules[modulePath],
		};
		if (hasChild) {
			// routes.redirect = children?.[0].path as never;
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

//递归获取tree的每一项
export const mapTreeMenu = (
	menus: MenuItem[],
	callback: (menu: MenuItem) => void
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
	return function (tree: MenuItem[] = root, Map = {}) {
		return tree.reduce((pre, next) => {
			if (!Map[next.path]) {
				Map[next.path] = [];
			}
			pre[next.path] = getTreeNameArrayById(root, next.id);
			if (next.children && next?.children.length > 0) {
				const deep = createMenuKeyMap(root);
				deep(next.children, Map);
			}
			return pre;
		}, Map);
	};
};

//根据id获取树状数据子内名称
function getTreeNameArrayById(tree: MenuItem[], Id: string): string[] {
	const breadcrumb: string[] = [];
	const deepPreNode = (arr: MenuItem[], id: string) => {
		arr.map((item: MenuItem) => {
			if (item.id === id) {
				breadcrumb.unshift(item.name);
				deepPreNode(tree, item.parentId);
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
export function getTreeToList<T extends MenuItem>(data: T[]): T[] {
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
