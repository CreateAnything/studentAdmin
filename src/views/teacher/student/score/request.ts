//根据班级id查找班级

import { MyRequest } from '@/request';
import { Api, StudentItem, UpdateScoreForm } from './type';

export const findStudentListById = (
	id: number
): Promise<StudentItem[]> => {
	return MyRequest.get<StudentItem[]>({
		url: Api.FIND_STUDENTLIST + '/' + id,
	});
};

//修改学生成绩
export const updateStudentScore = async (
	body: UpdateScoreForm[]
): Promise<void> => {
	await MyRequest.post({ url: Api.SUBMIT_SCORE, data: body });
};
