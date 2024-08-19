import { serverApi } from './api/server.api';

type Props = {
  email: string;
  password: string;
  name: string;
};

type Response = {
  access_token: string;
};

export const signupService = async (props: Props): Promise<Response> => {
  const { data } = await serverApi.post('/auth/signup', props);
  return data;
};
