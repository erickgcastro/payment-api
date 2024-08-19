import { type LucideIcon } from 'lucide-react';
import { forwardRef, type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentProps<'input'> & {
  icon?: LucideIcon;
  iconSize?: number;
  title?: string;
  type?: 'text' | 'number' | 'password' | 'email';
  name?: string;
  error?: boolean;
};

const InputText = forwardRef<HTMLInputElement, Props>(
  ({ title, icon: Icon, error, iconSize = 16, ...rest }, ref) => {
    return (
      <div>
        <div className='relative'>
          {Icon && (
            <div className='absolute h-full  left-[10px] flex items-center justify-center'>
              <Icon size={iconSize} className={twMerge('text-gray-400')} />
            </div>
          )}
          <input
            data-icon={!!Icon}
            data-error={error}
            {...rest}
            type={rest.type || 'text'}
            id={rest.id || rest.name}
            ref={ref}
            className={twMerge(
              'px-[12px] w-full py-[11px] text-defaultText border border-gray-400  data-[icon="true"]:pl-[35px] font-normal text-base rounded-md  bg-white  outline-none appearance-none focus:border-black data-[error="true"]:border-red-500',
              rest.className
            )}
          />
        </div>
      </div>
    );
  }
);

InputText.displayName = 'InputText';

// const InputText = () => {
//   return (
//     <input
//       type='text'
//       placeholder='Password'
//       className='px-[12px] w-full h-[48px] text-defaultText rounded-md border border-gray-400'
//     />
//   );
// };

export default InputText;
