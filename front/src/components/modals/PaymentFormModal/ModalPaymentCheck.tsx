import { useRef, useState } from 'react';
import { AxiosError } from 'axios';
import { X as Close } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  Close as DialogClose,
  Title as DialogTitle,
  Description as DialogDescription,
} from '@radix-ui/react-dialog';

import { formatAmount } from '@/helpers/formatAmount';
import { createTransactionService } from '@/services/create-transaction.service';
import type { IUser } from '@/types/user.type';
import { twMerge } from 'tailwind-merge';

type Props = {
  data: {
    recipient: IUser;
    amount: string;
  };
};

const ModalPaymentCheck = ({ data }: Props) => {
  const queryClient = useQueryClient();
  const btnCloseRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await createTransactionService({
        amount: data.amount,
        recipientId: data.recipient.id,
      });

      queryClient.invalidateQueries({ queryKey: ['user-balance'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Payment successful');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    } finally {
      if (btnCloseRef.current) btnCloseRef.current?.click();
    }
  };
  return (
    <>
      <div className='p-[10px] py-[14px] h-[50px]  border-b border-border-2 relative flex items-center justify-center '>
        <DialogTitle className='text-sm text-defaultText font-semibold'>
          Confirm payment
        </DialogTitle>
        <DialogClose
          ref={btnCloseRef}
          className={twMerge(
            'p-[10px]  absolute top-[50%] translate-y-[-50%] left-0',
            isLoading ? 'hidden' : undefined
          )}
        >
          <Close size={20} className='text-defaultText/80' />
        </DialogClose>
      </div>

      <DialogDescription className='hidden' />

      <div className='pt-[60px] px-[14px] relative flex-1 flex flex-col justify-between'>
        <div className='flex flex-col gap-[50px]'>
          <div className='flex flex-col gap-[5px]'>
            <span className='text-lg text-defaultText/80'>Amount</span>
            <span className='text-3xl font-bold'>
              <span className='text-defaultText/60'>$</span> {formatAmount(data.amount)}
            </span>
          </div>
          <div className='flex flex-col '>
            <span className='text-lg text-defaultText/80'>Recipient</span>
            <span className='text-2xl font-medium'>@ {data.recipient.name}</span>
          </div>
        </div>

        <div className='py-[10px]'>
          <button
            onClick={handleSubmit}
            className='bg-[#222] w-full text-white text-sm font-medium px-[12px] rounded-md py-[12px]'
          >
            Confirm
          </button>
        </div>

        {isLoading && (
          <div className='absolute top-0 left-0 h-full w-full z-10 bg-white flex items-center justify-center'>
            <div className='loader'></div>
          </div>
        )}
      </div>
    </>
  );
};

export default ModalPaymentCheck;
