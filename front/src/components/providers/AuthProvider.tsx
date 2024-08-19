'use client';
import { type ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

import { getUserByTokenService } from '@/services/get-user-by-token.service';
import { useAuthStore } from '@/stores/auth.store';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setUser, setIsFetching } = useAuthStore();

  const handleFetchUser = async () => {
    try {
      const token = Cookies.get('access-token');
      if (token) {
        const user = await getUserByTokenService(token);
        setUser(user);
      }
    } catch (error) {
      Cookies.remove('access-token');
    }
    setIsFetching(false);
  };

  useEffect(() => {
    handleFetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default AuthProvider;
