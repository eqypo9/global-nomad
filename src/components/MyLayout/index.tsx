import React, { ReactNode, useState } from 'react';
import SideNavigation from '../SideNavigation';
import SideNavigationMobileSize from '../SideNavigation/MobileSize';

/** 내 정보나 예약 내역등 profile이 있는 페이지들의 공통으로 나타나는 컴포넌트 */
type Children = {
  children: ReactNode;
};
export default function MyLayout({ children }: Children) {
  const [isSideNavVisible, setIsSideNavVisible] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavVisible(!isSideNavVisible);
  };

  return (
    <section className='pt-[2.4rem] md:pt-[7.2rem] pb-[15rem] px-[2rem] max-w-[124rem] mx-auto sm:flex gap-[2.4rem] items-start'>
      <div className='hidden sm:block'>
        <SideNavigation />
      </div>
      <div className='sm:hidden'>
        <SideNavigationMobileSize toggleSideNav={toggleSideNav} isSideNavVisible={isSideNavVisible} />
      </div>
      {children}
    </section>
  );
}
