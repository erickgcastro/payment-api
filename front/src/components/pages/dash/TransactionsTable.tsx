'use client';

import { format } from 'date-fns';
import classnames from 'classnames';

import { formatAmount } from '@/helpers/formatAmount';
import { getTransactionsByUserService } from '@/services/get-transactions-by-user.service';
import useInfiniteScrollQuery from '@/hooks/useInfiniteScrollQuery';
import { useAuthStore } from '@/stores/auth.store';
import type { ITransaction } from '@/types/transaction.type';

enum TranTypeEnum {
  sender = 'recipient',
  recipient = 'sender',
}

const TransactionsTable = () => {
  const { user } = useAuthStore();

  const { data, isLoading, hasNextPage, inViewRef } =
    useInfiniteScrollQuery<ITransaction>({
      queryFn: ({ pageParam = 1 }) =>
        getTransactionsByUserService({ page: pageParam, limit: 10 }),
      queryKey: ['transactions'],
      pageLimit: 10,
      initialPageParam: 1,
    });

  if (isLoading) {
    return (
      <div className='flex-1 h-full flex items-center justify-center'>
        <div className='loader' style={{ width: 35, height: 35 }}></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className='flex-1 h-full flex items-center justify-center'>
        <span className='text-center text-defaultText/90'>
          Looks like you don&apos;t have any transactions yet
        </span>
      </div>
    );
  }

  return (
    <div>
      <table className='w-full'>
        <thead className=''>
          <tr className=''>
            <th className='text-xs pl-[10px] text-start text-defaultText font-semibold  py-[10px]'>
              Date
            </th>
            <th className='text-xs text-start text-defaultText font-semibold'>
              Username
            </th>
            <th className='text-xs text-defaultText font-semibold pr-[10px]'>Amount</th>
          </tr>
        </thead>

        <tbody>
          {data.map((transaction, i) => {
            const tranType = transaction.senderId == user!.id ? 'sender' : 'recipient';
            return (
              <tr key={i} className='border-t border-gray-200'>
                <td className='pl-[10px] py-[10px] min-w-[150px] w-[120px]'>
                  <span className='text-defaultText/80 font-medium sm:text-sm text-xs'>
                    {format(transaction.createdAt, 'h:mm aaa, d/MM/yy')}
                  </span>
                </td>

                <td className=' py-[10px] min-w-[80px] w-[140px]'>
                  <span className=' font-medium text-sm'>
                    @{transaction[TranTypeEnum[tranType]].name}
                  </span>
                </td>

                <td className='text-center pr-[10px] py-[10px]  min-w-[120px] w-[200px]'>
                  <span
                    className={classnames(' text-sm font-semibold', {
                      'text-red-500': tranType == 'sender',
                      'text-green-500': tranType == 'recipient',
                    })}
                  >
                    $ {formatAmount(transaction.amount)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {hasNextPage && (
        <div ref={inViewRef} className='flex pt-[30px] items-center justify-center'>
          <div className='loader' style={{ width: 25, height: 25 }}></div>
        </div>
      )}
    </div>
  );
};

export default TransactionsTable;
