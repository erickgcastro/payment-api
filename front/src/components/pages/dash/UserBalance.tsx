'use client';

import UserAvatar from '@/components/UserAvatar';
import { formatAmount } from '@/helpers/formatAmount';
import { getUserBalanceService } from '@/services/get-user-balance.service';
import { useAuthStore } from '@/stores/auth.store';
import { useQuery } from '@tanstack/react-query';
import { RotateCcw } from 'lucide-react';

const UserBalance = () => {
  const { user } = useAuthStore();

  const { data, isPending } = useQuery({
    queryKey: ['user-balance'],
    queryFn: getUserBalanceService,
  });

  return (
    <div className=' bg-white rounded-md border border-gray-200 p-[20px] pb-[30px]'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-[10px]'>
          <UserAvatar name={user!.name} />
          <span className='text-sm font-medium'>@{user?.name}</span>
        </div>
      </div>

      {isPending && (
        <div className='mt-[30px]'>
          <div className='h-[40px] bg-gray-300 max-w-[35%] rounded animate-pulse'></div>
        </div>
      )}
      {!isPending && (
        <div className='mt-[30px] flex items-center'>
          <span className='text-3xl font-medium text-defaultText/60'>$</span>
          <span className='text-4xl font-bold ml-[10px]'>
            {formatAmount(data?.amount || '')}
          </span>
        </div>
      )}
    </div>
  );
};

export default UserBalance;
