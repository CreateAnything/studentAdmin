export enum Api {
	ADD_COURSE = '/studentmanager/course/save',
	DELETE_COURSE = '/studentmanager/course/delete',
	EDIT_COURSE = '/studentmanager/course/update',
	FIND_COURSE = '/studentmanager/course/list',
}
export interface CourseItem {
	id: string;
	name: string;
	classTime: string;
	address: string | string[];
	section: number;
	teacherId?: number;
	tname: string;
	week: number;
}

export type CourseForm = Omit<CourseItem, 'id' | 'tname'>;
