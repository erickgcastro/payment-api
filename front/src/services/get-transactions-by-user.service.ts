import type { ITransaction } from '@/types/transaction.type';
import { serverApi } from './api/server.api';
import Cookies from 'js-cookie';
import { objectToQueryParams } from '@/helpers/object-to-query-params';

type Props = {
  page: number;
  limit: number;
};

export const getTransactionsByUserService = async ({
  page,
  limit,
}: Props): Promise<ITransaction[]> => {
  const token = Cookies.get('access-token');

  const { data } = await serverApi.get(
    '/users/transactions' + objectToQueryParams({ page, limit }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
