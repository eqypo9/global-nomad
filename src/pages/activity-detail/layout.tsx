import { ReactNode } from 'react';

/* eslint-disable */
export default function DetailLayout({ children }: { children: ReactNode }) {
  return <main className='max-w-[120rem] mx-auto pt-[7.8rem] pb-[14rem] min-h-[calc(100vh-16rem)] md:py-[14rem_2.4rem_16rem_2.4rem] sm:py-[14rem_1.6rem_16rem_1.6rem]'>{children}</main>;
}
/* eslint-enable */
