export interface Student {
	id: number;
	name: string;
	password: string;
	role: number;
	sex: string;
	className: string;
}
export interface StudentSearch {
	name: string;
	className: string;
	department: string;
}

export type StudentForm = StudentSearch & {
	sex: string;
	birthDay: string;
};
export enum Api {
	GET_STU = '/studentmanager/student/list',
	SAVE_STU = '/studentmanager/student',
	EDIT_STU = '/studentmanager/student',
	DELETE_STU = '/studentmanager/student',
}
