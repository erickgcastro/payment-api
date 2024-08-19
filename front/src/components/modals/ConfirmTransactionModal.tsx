'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { IUser } from '@/types/user.type';
import { formatAmount } from '@/helpers/formatAmount';
import { createTransactionService } from '@/services/create-transaction.service';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  trigger?: ReactNode;
  data: {
    recipient: IUser;
    amount: string;
  };
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const ConfirmTransactionModal = ({
  trigger,
  isOpen,
  defaultOpen,
  onOpenChange,
  data,
}: Props) => {
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
    <Dialog.Root onOpenChange={onOpenChange} open={isOpen} defaultOpen={defaultOpen}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className='transition-opacity fixed inset-0 z-[100] bg-black/40' />
        <Dialog.Content className='fixed top-[50%] left-[50%] translate-x-[-50%] z-[101] translate-y-[-50%] focus:outline-none'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className='w-[380px] min-h-[350px] h-max relative flex flex-col gap-[50px] justify-between py-[30px] p-[40px] bg-white shadow-md rounded-md border  border-border-2'
          >
            <Dialog.Title className='text-xl text-center font-medium'>
              Confirm Payment
            </Dialog.Title>

            <Dialog.Description className='hidden'></Dialog.Description>

            <div className='flex flex-col gap-[20px]'>
              <div className='flex flex-col'>
                <span className='text-sm text-defaultText/80'>Amount</span>
                <span className='text-xl font-bold'>
                  <span className='text-defaultText/60'>$</span>{' '}
                  {formatAmount(data.amount)}
                </span>
              </div>
              <div className='flex flex-col '>
                <span className='text-sm text-defaultText/80'>Recipient</span>
                <span className='text-lg font-medium'>@ {data.recipient.name}</span>
              </div>
            </div>

            <div className='flex gap-[10px]'>
              <Dialog.Close
                ref={btnCloseRef}
                className='border border-[#222] w-full  text-sm font-medium px-[12px] rounded-md py-[10px]'
              >
                Cancel
              </Dialog.Close>
              <button
                onClick={handleSubmit}
                className='bg-[#222] w-full text-white text-sm font-medium px-[12px] rounded-md py-[10px]'
              >
                Confirm
              </button>
            </div>

            {isLoading && (
              <div className='absolute top-0 left-0 h-full w-full z-10 bg-white flex items-center justify-center'>
                <div className='loader'></div>
              </div>
            )}
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ConfirmTransactionModal;
