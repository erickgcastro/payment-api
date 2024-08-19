'use client';

import InputText from '@/components/InputText';
import ConfirmTransactionModal from '@/components/modals/ConfirmTransactionModal';
import { AtSign, DollarSign } from 'lucide-react';
import usePaymentSidebarform from './usePaymentSidebarForm';

const PaymentSidebarForm = () => {
  const {
    errors,
    isSubmitting,
    recipientAndAmount,
    changeRecipientAndAmount,
    onSubmit,
    register,
    reset,
  } = usePaymentSidebarform();

  return (
    <>
      <div className='w-[320px] relative h-max  p-[20px] bg-white rounded-md border border-gray-200'>
        <h2 className='text-lg font-medium text-center'>New Payment</h2>
        <form className=' mt-[25px] flex-col flex gap-[10px]' onSubmit={onSubmit}>
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
          <button
            type='submit'
            className='bg-[#222] w-full text-white text-sm font-medium px-[12px] rounded-md h-[47px]'
          >
            Pay
          </button>

          {!!Object.keys(errors).length && (
            <button
              onClick={() => reset()}
              type='button'
              className='py-[4px] hover:underline'
            >
              cancel
            </button>
          )}
        </form>

        {isSubmitting && (
          <div className='absolute top-0 left-0 h-full w-full z-10 bg-white flex items-center justify-center'>
            <div className='loader'></div>
          </div>
        )}
      </div>

      {recipientAndAmount && (
        <ConfirmTransactionModal
          defaultOpen={true}
          data={recipientAndAmount}
          onOpenChange={() => changeRecipientAndAmount(null)}
        />
      )}
    </>
  );
};

export default PaymentSidebarForm;
