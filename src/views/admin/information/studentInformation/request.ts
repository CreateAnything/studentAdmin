import { MyRequest } from '@/request/index';
import { Api, Student, StudentForm } from './type';
//获取学生列表
export const findAllStudentList = async (): Promise<Student[]> => {
	const result = await MyRequest.get<Student[]>({ url: Api.GET_STU });
	return result.page;
};

//添加学生
export const addStudent = async (body: StudentForm): Promise<void> => {
	await MyRequest.post({ url: Api.SAVE_STU, data: body });
};

//编辑学生
export const editStudent = async (body: StudentForm): Promise<void> => {
	await MyRequest.put({ url: Api.EDIT_STU, params: body });
};

//删除学生
export const deleteStudent = async (ids: number[]): Promise<void> => {
	await MyRequest.delete({ url: Api.DELETE_STU, data: ids });
};
//获取单个学生
export const findStudentById = async (id: number): Promise<Student> => {
	const result = await MyRequest.get<Student>({
		url: Api.GET_STUBYID + '/' + id,
	});
	return result.student;
};
