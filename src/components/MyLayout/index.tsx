import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SideNavigation from '../SideNavigation';
import SideNavigationMobileSize from '../SideNavigation/MobileSize';

/** 내 정보나 예약 내역등 profile이 있는 페이지들의 공통으로 나타나는 컴포넌트 */
type Children = {
  children: ReactNode;
};
export default function MyLayout({ children }: Children) {
  const [isSideNavVisible, setIsSideNavVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  const toggleSideNav = () => {
    setIsSideNavVisible(!isSideNavVisible);
  };

  useEffect(() => {
    if (!localStorage.getItem('accessToken') || !localStorage.getItem('refreshToken')) {
      router.push('/');
    } else {
      setIsLoaded(true);
    }
  }, [router]);

  return isLoaded ? (
    <section className='pt-[2.4rem] lg:pt-[7.2rem] pb-[15rem] px-[2rem] max-w-[124rem] mx-auto sm:flex gap-[2.4rem] items-start'>
      <div className='hidden md:block'>
        <SideNavigation />
      </div>
      <div className='md:hidden'>
        <SideNavigationMobileSize toggleSideNav={toggleSideNav} isSideNavVisible={isSideNavVisible} />
      </div>
      {children}
    </section>
  ) : (
    <div>로딩중</div>
  );
}
