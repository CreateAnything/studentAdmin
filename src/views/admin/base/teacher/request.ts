import { MyRequest } from '@/request/index';
import { Api, Teacher, TeacherForm } from './type';
//获取全部老师
export const findAllTeacher = async (): Promise<Teacher[]> => {
	const result = await MyRequest.get<Teacher[]>({
		url: Api.FIND_TEACHER,
	});
	return result;
};

//删除老师
export const removeTeacher = async (ids: number[]): Promise<void> => {
	await MyRequest.delete({ url: Api.DLETE_TEACHER, data: ids });
};

//增加老师
export const addTeacher = async (body: TeacherForm): Promise<void> => {
	await MyRequest.post({ url: Api.ADD_TEACHER, data: body });
};

//编辑老师
export const editTeacher = async (body: TeacherForm): Promise<void> => {
	await MyRequest.put({ url: Api.EDIT_TEACHER, data: body });
};

//获取单个老师
export const findTeacherById = async (id: number): Promise<Teacher> => {
	const result = await MyRequest.get<Teacher>({
		url: Api.FIND_TEACHERBYID + '/' + id,
	});
	return result;
};
