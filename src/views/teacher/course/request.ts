import { MyRequest } from '@/request';
import { CourseItem } from '@/views/admin/base/course/type';
import { Teacher } from '@/views/admin/base/teacher/type';
enum Api {
	FIND_COURSE = '/studentmanager/teacher/info',
	COURSE_INFO = '/studentmanager/course/info',
}

export const findTeacherByid = async (id: number): Promise<Teacher> => {
	return await MyRequest.get<Teacher>({
		url: Api.FIND_COURSE + '/' + id,
	});
};

export const findCourseInfo = async (
	id: number | string
): Promise<CourseItem> => {
	return await MyRequest.get<CourseItem>({
		url: Api.COURSE_INFO + '/' + id,
	});
};
