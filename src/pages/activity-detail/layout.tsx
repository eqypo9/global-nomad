import { ReactNode } from 'react';

/* eslint-disable */
export default function DetailLayout({ children }: { children: ReactNode }) {
  return (
    <main
      className='
      max-w-[120rem] mx-auto 
      pt-[7.8rem] pb-[2rem] min-h-[calc(100vh-4rem)]
      lg:px-[2.4rem] 
      md:px-[1.6rem] 
      px-[2rem] 
      sm:px-[1rem]
    '
    >
      {children}
    </main>
  );
}
/* eslint-enable */
