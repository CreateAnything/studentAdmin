import { MenuTree } from '@/views/admin/authority/menu/type';
import { MenuItem } from 'global';

type MenuExcluter = (key: string) => string[];
type createMenuFn = (menus: MenuItem[]) => MenuExcluter;

type useTreeReturnType = (
	tree?: MenuTree[],
	container?: Record<string, string[]>
) => Record<string, string[]>;
type UseTreeFnType = (root: MenuTree[]) => useTreeReturnType;

export interface TreeConfig {
	root?: string | number;
	data: any[];
	parentKey?: string;
	sortKey?: string;
	idKey?: string;
}

export type { UseTreeFnType, createMenuFn };
