import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { ISignupDTO, signupDTO } from './siginup.dto';
import { getUserByTokenService } from '@/services/get-user-by-token.service';
import { useAuthStore } from '@/stores/auth.store';
import { useState } from 'react';
import { signupService } from '@/services/singup.service';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

const useSignup = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  const [apiErro, setApiErro] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ISignupDTO>({
    resolver: zodResolver(signupDTO),
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      setApiErro(false);
      const data = await signupService({
        email: formData.email,
        password: formData.password,
        name: formData.name,
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

export default useSignup;
