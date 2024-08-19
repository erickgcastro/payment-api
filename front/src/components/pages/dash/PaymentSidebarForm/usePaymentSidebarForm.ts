import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { IFormDTO, formDTO } from './form.dto';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { getUserByNameService } from '@/services/get-user-by-name.service';
import { useState } from 'react';
import type { IUser } from '@/types/user.type';
import { useAuthStore } from '@/stores/auth.store';

type RecipientAndAmountDTO = {
  recipient: IUser;
  amount: string;
};

const usePaymentSidebarform = () => {
  const { user } = useAuthStore();
  const [recipientAndAmount, setRecipientAndAmount] =
    useState<RecipientAndAmountDTO | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormDTO>({
    resolver: zodResolver(formDTO),
  });

  const changeRecipientAndAmount = (v: RecipientAndAmountDTO | null) => {
    setRecipientAndAmount(() => v);
  };

  const onSubmit = handleSubmit(async (formData) => {
    if (user!.name === formData.recipient.toLowerCase()) {
      toast.error('cannot send money to yourself');
      return;
    }
    try {
      const user = await getUserByNameService(formData.recipient.toLowerCase());
      setRecipientAndAmount({
        recipient: user,
        amount: formData.amount,
      });
      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  });

  return {
    errors,
    isSubmitting,
    recipientAndAmount,
    changeRecipientAndAmount,
    reset,
    register,
    onSubmit,
  };
};

export default usePaymentSidebarform;
