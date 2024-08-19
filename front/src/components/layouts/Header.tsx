import { Github } from 'lucide-react';
import Link from 'next/link';
import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Header = ({ children }: Props) => {
  return (
    <div className='h-[55px] bg-white w-full'>
      <div className='container mx-auto h-full flex items-center justify-between px-[14px]'>
        <span className='font-bold text-xl'>LOGO</span>

        <div className='flex gap-[25px] items-center'>
          <div className='flex gap-[24px] items-center'>
            <Link target='_blank' href='https://github.com/erickgcastro/payment-api'>
              <Github />
            </Link>
          </div>

          <div className='h-[10px] w-[1px] bg-gray-300'></div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default Header;
