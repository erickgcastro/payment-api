import { serverApi } from './api/server.api';
import type { IUser } from '@/types/user.type';
import Cookies from 'js-cookie';

export const getUserBalanceService = async (): Promise<{ amount: string }> => {
  const token = Cookies.get('access-token');

  const { data } = await serverApi.get('/users/balance', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
