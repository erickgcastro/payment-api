'use client';

import InputText from '@/components/InputText';
import Header from '@/components/layouts/Header';
import useSignup from '@/components/pages/signup/useSignup';
import Link from 'next/link';

const SignupPage = () => {
  const { errors, apiErro, isSubmitting, isSubmitSuccessful, register, onSubmit } =
    useSignup();

  const showLoading = isSubmitting || (isSubmitSuccessful && !apiErro);

  return (
    <div className='min-h-screen bg-white flex flex-col'>
      <div className=' fixed top-0 left-0 w-full'>
        <Header>
          <Link
            href='/auth/signin'
            className='bg-[#222] text-white px-[14px] py-[7px] rounded-md'
          >
            Sign In
          </Link>
        </Header>
      </div>

      <div className='flex-1 flex items-center justify-center'>
        {showLoading && <div className='loader '></div>}

        {!showLoading && (
          <div className='w-full max-w-[320px]'>
            <div className='flex items-center justify-center '>
              <span className='text-[28px] font-semibold'>Create an account</span>
            </div>

            <form onSubmit={onSubmit} className='flex flex-col gap-[12px] mt-[36px]'>
              <div>
                <InputText
                  placeholder='Name'
                  id='name'
                  error={!!errors.name}
                  {...register('name')}
                />
                {errors.name && (
                  <span className='pl-[5px] text-red-500 text-[11px] font-medium'>
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div>
                <InputText
                  placeholder='Email'
                  type='email'
                  id='email'
                  error={!!errors.email}
                  {...register('email')}
                />
                {errors.email && (
                  <span className='pl-[5px] text-red-500 text-[11px] font-medium'>
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div>
                <InputText
                  placeholder='Password'
                  type='password'
                  id='password'
                  error={!!errors.password}
                  {...register('password')}
                />
                {errors.password && (
                  <span className='pl-[5px] text-red-500 text-[11px] font-medium'>
                    {errors.password.message}
                  </span>
                )}
              </div>
              <button className='bg-[#222] text-white text-base font-medium px-[12px] rounded-md h-[47px]'>
                Submit
              </button>
              <Link
                href='/auth/signin'
                className='w-max mx-auto mt-[5px] hover:underline'
              >
                Sign In
              </Link>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
