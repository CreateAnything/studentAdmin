import { MyRequest } from '@/request/index';
import { Api, DeparmentItem } from './type';

export const findAllDeparment = async (): Promise<DeparmentItem[]> => {
	const result = MyRequest.get<DeparmentItem[]>({
		url: Api.FIND_DEPARMENT,
	});
	return (await result).page;
};
