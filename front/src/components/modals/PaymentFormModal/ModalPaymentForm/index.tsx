import InputText from '@/components/InputText';
import {
  Close as DialogClose,
  Title as DialogTitle,
  Description as DialogDescription,
} from '@radix-ui/react-dialog';
import { AtSign, X as Close, DollarSign } from 'lucide-react';
import useModalPaymentForm from './useModalPaymentForm';
import type { IUser } from '@/types/user.type';

type Props = {
  onSuccess?: (v: { recipient: IUser; amount: string }) => void;
};

const ModalPaymentForm = ({ onSuccess }: Props) => {
  const { errors, isSubmitting, onSubmit, register } = useModalPaymentForm({ onSuccess });

  return (
    <>
      <div className='p-[10px] py-[14px] h-[50px]  border-b border-border-2 relative flex items-center justify-center '>
        <DialogTitle className='text-sm text-defaultText font-semibold'>
          New payment
        </DialogTitle>
        {!isSubmitting && (
          <DialogClose className='p-[10px]  absolute top-[50%] translate-y-[-50%] left-0'>
            <Close size={20} className='text-defaultText/80' />
          </DialogClose>
        )}
      </div>

      <DialogDescription className='hidden' />

      <form
        onSubmit={onSubmit}
        className='pt-[60px] px-[14px] relative flex-1 flex flex-col justify-between'
      >
        <div className='flex flex-col gap-[20px]'>
          <div>
            <InputText
              placeholder='Name'
              icon={AtSign}
              error={!!errors.recipient}
              id='recipient'
              {...register('recipient')}
            />
            {errors.recipient && (
              <span className='pl-[5px] text-red-500 text-[11px] font-medium'>
                {errors.recipient.message}
              </span>
            )}
          </div>
          <div>
            <InputText
              placeholder='Amount'
              type='number'
              step='0.01'
              min={0}
              id='amount'
              icon={DollarSign}
              error={!!errors.amount}
              {...register('amount')}
            />
            {errors.amount && (
              <span className='pl-[5px] text-red-500 text-[11px] font-medium'>
                {errors.amount.message}
              </span>
            )}
          </div>
        </div>

        <div className='py-[10px]'>
          <button
            type='submit'
            className='bg-[#222] w-full text-white text-sm font-medium px-[12px] rounded-md py-[12px]'
          >
            Send
          </button>
        </div>

        {isSubmitting && (
          <div className='absolute top-0 left-0 h-full w-full z-10 bg-white flex items-center justify-center'>
            <div className='loader'></div>
          </div>
        )}
      </form>
    </>
  );
};

export default ModalPaymentForm;
