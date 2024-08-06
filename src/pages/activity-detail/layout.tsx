import { ReactNode } from 'react';

/* eslint-disable */
export default function DetailLayout({ children }: { children: ReactNode }) {
  return (
    <main
      className='
        max-w-[120rem] mx-auto 
        pt-[1.6rem] 
        md:pt-[2.9rem] 
        lg:pt-[7.8rem] 
        px-[2rem] 
        sm:px-[1rem] 
        md:px-[1.6rem] 
        lg:px-[2.4rem] 
      '
    >
      {children}
    </main>
  );
}
/* eslint-enable */
