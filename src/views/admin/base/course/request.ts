import { MyRequest } from '@/request/index';
import { Api, CourseForm, CourseItem } from './type';
//查找全部课程
export const findAllCourse = async (): Promise<CourseItem[]> => {
	const result = await MyRequest.get<CourseItem[]>({
		url: Api.FIND_COURSE,
	});
	return result.page;
};

//新增课程
export const addCourse = async (body: CourseForm): Promise<void> => {
	await MyRequest.post({ url: Api.ADD_COURSE, data: body });
};

//删除课程
export const removeCourse = async (ids: number[]): Promise<void> => {
	await MyRequest.delete({ url: Api.DELETE_COURSE, data: ids });
};

//编辑课程
export const editCourse = async (body: CourseForm): Promise<void> => {
	await MyRequest.put({ url: Api.EDIT_COURSE, data: body });
};
