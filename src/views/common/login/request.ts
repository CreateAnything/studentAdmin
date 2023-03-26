import { MyRequest } from '@/request';
import { Api, LoginForm, UserInfo } from './type';

export const userLogin = async ({
	username,
	password,
}: LoginForm): Promise<UserInfo> => {
	const result = await MyRequest.get<UserInfo>({
		url: `${Api.LOGIN_IN}/${username}/${password}`,
	});
	return result;
};
