import { Student } from '@/views/admin/information/studentInformation/type';

export enum Api {
	FIND_STUDENTLIST = '/studentmanager/student/class',
	SUBMIT_SCORE = '/studentmanager/score/save',
}

export interface ScoreDots {
	cname: string;
	courseId: number;
	id: number;
	sname: string;
	score: number;
	studentId: number;
}
export interface StudentItem extends Student {
	classId: number;
	departmentId: number;
	scoreDtos: ScoreDots[];
}
export interface StudentList extends Omit<StudentItem, 'screDtos'> {
	cname: string;
	score: number;
}
export type TableSourse = {
	courseId: number;
	score: number;
	studentId?: number;
	name: string;
	clazzName: string;
	cname: string;
};
export type UpdateScoreForm = Omit<TableSourse, 'name' | 'clazzName'>;

export interface MyStudent extends StudentItem {
	score?: number | string;
}
export type XlsKey = keyof Pick<
	MyStudent,
	'name' | 'dname' | 'clazzName' | 'score'
>;
export type XlsMapKey = { name: string; key: XlsKey };
