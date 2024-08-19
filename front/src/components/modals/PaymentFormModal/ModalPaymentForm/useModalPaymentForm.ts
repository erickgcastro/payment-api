import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { IFormDTO, formDTO } from './form.dto';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { getUserByNameService } from '@/services/get-user-by-name.service';
import { useState } from 'react';
import type { IUser } from '@/types/user.type';
import { useAuthStore } from '@/stores/auth.store';

type Props = {
  onSuccess?: (v: { recipient: IUser; amount: string }) => void;
};

const useModalPaymentForm = ({ onSuccess }: Props) => {
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormDTO>({
    resolver: zodResolver(formDTO),
  });

  const onSubmit = handleSubmit(async (formData) => {
    if (user!.name === formData.recipient.toLowerCase()) {
      toast.error('cannot send money to yourself');
      return;
    }
    try {
      const user = await getUserByNameService(formData.recipient.toLowerCase());
      onSuccess &&
        onSuccess({
          recipient: user,
          amount: formData.amount,
        });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  });

  return {
    errors,
    isSubmitting,
    register,
    onSubmit,
  };
};

export default useModalPaymentForm;
