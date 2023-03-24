export enum Api {
	SAVE_CLASS = '/studentmanager/clazz/save',
	FIND_CALSS = '/studentmanager/clazz/list',
	DELETE_CLASS = '/studentmanager/clazz/delete',
	EDIT_CLASS = '/studentmanager/clazz/update',
	FIND_CLASSBYID = '/studentmanager/clazz/info',
}

export interface ClassItem {
	id: number;
	clazzName: string;
	tname: string;
	chargeId?: number;
}
export type ClassForm = Omit<ClassItem, 'id' | 'tname'>;
