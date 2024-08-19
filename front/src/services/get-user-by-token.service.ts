import { serverApi } from './api/server.api';
import type { IUser } from '@/types/user.type';

export const getUserByTokenService = async (token: string): Promise<IUser> => {
  const { data } = await serverApi.get('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
