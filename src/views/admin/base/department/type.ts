export enum Api {
	ADD_DEPARMENT = '/studentmanager/department/save',
	FIND_DEPARMENT = '/studentmanager/department/list',
	DELETE_DEPARMENT = '/studentmanager/department/delete',
	EDIT_DEPARMENT = '/studentmanager/department/update',
}
export interface DeparmentItem {
	id: number;
	name: string;
}

export interface DpeartmentForm {
	name: string;
}
