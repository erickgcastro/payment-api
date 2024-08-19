import { serverApi } from './api/server.api';
import type { IUser } from '@/types/user.type';

export const getUserByNameService = async (name: string): Promise<IUser> => {
  const { data } = await serverApi.get(`/users/name/${name}`);
  return data;
};
