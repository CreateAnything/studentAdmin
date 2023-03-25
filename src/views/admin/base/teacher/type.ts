export enum Api {
	ADD_TEACHER = '/studentmanager/teacher/save',
	EDIT_TEACHER = '/studentmanager/teacher/update',
	DLETE_TEACHER = '/studentmanager/teacher/delete',
	FIND_TEACHER = '/studentmanager/teacher/list',
	FIND_TEACHERBYID = '/studentmanager/teacher/info',
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
	departmentId: number | undefined;
	clazzId: number | undefined;
	courseId: number | undefined;
} & Pick<Teacher, 'birthday' | 'sex' | 'name'>;
