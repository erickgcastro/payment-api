'use client';

import InputText from '@/components/InputText';
import Header from '@/components/layouts/Header';
import useSignin from '@/components/pages/signin/useSignin';
import Link from 'next/link';

const SigninPage = () => {
  const { errors, apiErro, isSubmitting, isSubmitSuccessful, register, onSubmit } =
    useSignin();

  const showLoading = isSubmitting || (isSubmitSuccessful && !apiErro);

  return (
    <div className='min-h-screen bg-white flex flex-col'>
      <div className='fixed top-0 left-0 w-full'>
        <Header>
          <Link
            href='/auth/signup'
            className='bg-[#222] text-white px-[14px] py-[7px] rounded-md'
          >
            Sign Up
          </Link>
        </Header>
      </div>

      <div className='flex-1 flex items-center justify-center'>
        {showLoading && <div className='loader '></div>}

        {!showLoading && (
          <div className='w-full max-w-[320px]'>
            <div className='flex items-center justify-center '>
              <span className='text-[28px] font-semibold'>Log in</span>
            </div>

            <form onSubmit={onSubmit} className='flex flex-col gap-[12px] mt-[36px]'>
              <InputText
                placeholder='Email'
                id='email'
                type='email'
                error={!!errors.email}
                {...register('email')}
              />
              <InputText
                placeholder='Password'
                type='password'
                id='password'
                error={!!errors.password}
                {...register('password')}
              />

              <button
                type='submit'
                className='bg-[#222] text-white text-base font-medium px-[12px] rounded-md h-[47px]'
              >
                Submit
              </button>
              <Link
                href='/auth/signup'
                className='w-max mx-auto mt-[5px] hover:underline'
              >
                Sign Up
              </Link>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SigninPage;
