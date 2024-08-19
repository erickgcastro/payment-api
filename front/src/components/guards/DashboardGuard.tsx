'use client';

import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'next/navigation';
import { type ReactNode, useEffect } from 'react';

const DashboardGuard = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { isFetching, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isFetching && !isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isAuthenticated, isFetching, router]);

  if (isFetching || !isAuthenticated) {
    return (
      <div className='min-h-screen  bg-white flex items-center justify-center'>
        <span className='text-[40px] font-bold'>LOGO</span>
      </div>
    );
  }

  return children;
};

export default DashboardGuard;
