export enum Api {
	ADD_TEACHER = '/studentmanager/teacher/save',
	EDIT_TEACHER = '/studentmanager/teacher/update',
	DLETE_TEACHER = '/studentmanager/teacher/delete',
	FIND_TEACHER = '/studentmanager/teacher/list',
}

export interface Teacher {
	id: number;
	name: string;
	birthday: string;
	dname: string;
	sex: string;
	fname: string;
	clazzName: string;
	facultyId: string;
	departmentId: number;
	clazzId: number;
}

export type TeacherForm = {
	department_id: number | undefined;
	faculty_id: number | undefined;
	clazz_id: number | undefined;
} & Pick<Teacher, 'birthday' | 'sex' | 'name'>;
