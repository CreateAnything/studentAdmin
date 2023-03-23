export enum Api {
	SAVE_CLASS = '/studentmanager/clazz/save',
	FIND_CALSS = '/studentmanager/clazz/list',
	DELETE_CLASS = '/studentmanager/clazz/delete',
	EDIT_CLASS = '/studentmanager/clazz/update',
}

export interface ClassItem {
	id: number;
	clazzName: string;
	tname: string;
}
