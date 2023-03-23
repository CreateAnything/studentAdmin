import { Dayjs } from '_dayjs@1.11.7@dayjs';
export interface Student {
	id: number;
	name: string;
	sex: string;
	clazzName: string;
	dname: string;
	birthday: string;
}
export interface StudentSearch {
	name?: string;
	classId?: string;
	departmentId?: string;
}

export type StudentForm = StudentSearch & {
	sex?: string;
	birthday?: string;
	password?: string;
};
export enum Api {
	GET_STU = '/studentmanager/student/list',
	SAVE_STU = '/studentmanager/student/save',
	EDIT_STU = '/studentmanager/student',
	DELETE_STU = '/studentmanager/student/delete',
	GET_STUBYID = '/studentmanager/student/info',
}

//add
export type onChange = (date: Dayjs | string, dateString: string) => void;
export interface EditorProps {
	isEdit?: string;
	student: Student;
}
