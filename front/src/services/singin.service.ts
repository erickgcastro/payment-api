import { serverApi } from './api/server.api';

type Props = {
	email: string;
	password: string;
};

type Response = {
	access_token: string;
};

export const signinService = async (props: Props): Promise<Response> => {
	const { data } = await serverApi.post('/auth/signin', props);
	return data;
};
