type Props = {
  name: string;
};

const UserAvatar = ({ name }: Props) => {
  return (
    <div className='bg-gray-200 h-[30px] border border-gray-200 aspect-square rounded-full flex items-center justify-center'>
      <span className='font-bold text-xs uppercase text-defaultText/70'>
        {name[0]}
        {name[1]}
      </span>
    </div>
  );
};

export default UserAvatar;
