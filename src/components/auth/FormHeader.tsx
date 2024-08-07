import Link from 'next/link';
import Image from 'next/image';
import { IMAGE } from '@/constant';
import DarkModeStore from '@/context/themeContext';

const { logo } = IMAGE;
const { darkLogo } = IMAGE;

export default function FormHeader() {
  const { isDarkMode } = DarkModeStore();
  return (
    <div className='flex justify-center w-full'>
      <Link href='/'>
        <div className='relative md:w-[34rem] md:h-[19.2rem] w-[27rem] h-[15.4rem]'>
          {isDarkMode ? (
            <Image className='w-full h-full object-cover' src={darkLogo.auth.src} alt={darkLogo.auth.alt} sizes='100%' fill priority />
          ) : (
            <Image className='w-full h-full object-cover' src={logo.auth.src} alt={logo.auth.alt} sizes='100%' fill priority />
          )}
        </div>
      </Link>
    </div>
  );
}
