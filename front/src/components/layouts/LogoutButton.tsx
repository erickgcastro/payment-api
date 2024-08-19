'use client';

import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useQueryClient } from '@tanstack/react-query';

const LogoutButton = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleLogout = () => {
    router.push('/');
    Cookies.remove('access-token');
    setUser(null);
    queryClient.invalidateQueries();
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
