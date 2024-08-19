import Cookies from 'js-cookie';
import { serverApi } from './api/server.api';

type Props = {
  amount: string;
  recipientId: string;
};

type Response = {
  tranactionId: string;
};

export const createTransactionService = async (props: Props): Promise<Response> => {
  const token = Cookies.get('access-token');
  const { data } = await serverApi.post('/transactions', props, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
