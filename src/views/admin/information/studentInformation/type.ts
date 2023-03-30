type CourseDots = {
	address: string;
	classtime: string;
	id: number;
	name: string;
	section: number;
	teacherId: number;
	tname: string;
	week: number;
};
export interface Student {
	id?: number;
	name?: string;
	sex?: string;
	clazzName?: string;
	dname?: string;
	birthday?: string;
	courseDots?: CourseDots[];
	password?: string;
	classId?: number;
	departmentId?: number;
	courseIds?: string;
}
export type StudentForm = {
	name?: string;
	classId?: number;
	departmentId?: number;
	sex?: string;
	birthday?: string;
	password?: string;
	courseIds?: string;
};
export interface EditStudentPaylod extends StudentForm {
	id?: number;
}
export enum Api {
	GET_STU = '/studentmanager/student/list',
	SAVE_STU = '/studentmanager/student/save',
	EDIT_STU = '/studentmanager/student/update',
	DELETE_STU = '/studentmanager/student/delete',
	GET_STUBYID = '/studentmanager/student/info',
}

//add
export type onChange = (date: any | string, dateString: string) => void;
export interface EditorProps {
	isEdit?: string;
	student: Student;
}
