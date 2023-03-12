import { MenuItem } from '@/vite-env';

type MenuExcluter = (key: string) => string[];
type createMenuFn = (menus: MenuItem[]) => MenuExcluter;

type useTreeReturnType = (
	tree?: MenuItem[],
	container?: Record<string, string[]>
) => Record<string, string[]>;
type UseTreeFnType = (root: MenuItem[]) => useTreeReturnType;

export type { UseTreeFnType, createMenuFn };
