import { MyRequest } from '@/request/index';
import { Api, Teacher, TeacherForm } from './type';
//获取全部老师
export const findAllTeacher = async (): Promise<Teacher[]> => {
	const result = await MyRequest.get<Teacher[]>({
		url: Api.FIND_TEACHER,
	});
	return result.page;
};

//删除老师
export const removeTeacher = async (id: number): Promise<void> => {
	await MyRequest.delete({ url: Api.DLETE_TEACHER, params: id });
};

//增加老师
export const addTeacher = async (body: TeacherForm): Promise<void> => {
	await MyRequest.post({ url: Api.ADD_TEACHER, data: body });
};

//编辑老师
export const editTeacher = async (body: TeacherForm): Promise<void> => {
	await MyRequest.put({ url: Api.EDIT_TEACHER, data: body });
};
