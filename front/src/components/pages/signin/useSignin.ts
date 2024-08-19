import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { signinService } from '@/services/singin.service';
import { ISiginDTO, siginDTO } from './siginin.dto';
import { getUserByTokenService } from '@/services/get-user-by-token.service';
import { useAuthStore } from '@/stores/auth.store';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

const useSignin = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  const [apiErro, setApiErro] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ISiginDTO>({
    resolver: zodResolver(siginDTO),
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      setApiErro(false);
      const data = await signinService({
        email: formData.email,
        password: formData.password,
      });

      if (data.access_token) {
        const user = await getUserByTokenService(data.access_token);
        setUser(user);
        Cookies.set('access-token', data.access_token);
        router.push('/');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      setApiErro(true);
    }
  });

  return {
    errors,
    apiErro,
    isSubmitting,
    isSubmitSuccessful,
    register,
    onSubmit,
  };
};

export default useSignin;
