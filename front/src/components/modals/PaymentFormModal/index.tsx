'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

import ModalPaymentForm from './ModalPaymentForm';
import type { IUser } from '@/types/user.type';
import ModalPaymentCheck from './ModalPaymentCheck';

type Props = {
  trigger: ReactNode;
  isOpen?: boolean;
  defaultOpen?: boolean;
};

const PaymentFormModal = ({ trigger }: Props) => {
  const [recipientAndAmount, setRecipientAndAmount] = useState<{
    recipient: IUser;
    amount: string;
  } | null>(null);

  return (
    <Dialog.Root onOpenChange={(v) => !v && setRecipientAndAmount(null)}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='transition-opacity fixed inset-0 z-[100] bg-black/40' />
        <Dialog.Content className='z-[100] fixed focus:outline-none bottom-0 left-0 h-[100%] w-[100%]  flex items-end'>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            className='bg-white  text-defaultText flex flex-col w-screen'
          >
            {!recipientAndAmount && (
              <ModalPaymentForm onSuccess={(v) => setRecipientAndAmount(v)} />
            )}

            {recipientAndAmount && <ModalPaymentCheck data={recipientAndAmount} />}
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PaymentFormModal;
