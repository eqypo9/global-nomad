import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

type Children = {
  children: ReactNode;
};
export default function Layout({ children }: Children) {
  return (
    <>
      <Header />
      <div className='dark:bg-black h-auto min-h-[calc(100vh-23rem)]'>{children}</div>
      <Footer />
    </>
  );
}
