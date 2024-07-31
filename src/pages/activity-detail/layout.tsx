import { ReactNode } from 'react';

/* eslint-disable */
export default function DetailLayout({ children }: { children: ReactNode }) {
  // 반응형 수정중
  return (
    <main
      className='
      max-w-[120rem] mx-auto 
      pt-[7.8rem] pb-[14rem] min-h-[calc(100vh-16rem)]
      lg:px-[2.4rem] 
      md:px-[1.6rem] 
      px-[36rem]
    '
    >
      {children}
    </main>
  );
}
/* eslint-enable */
