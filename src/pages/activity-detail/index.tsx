import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getDetailsForActivity, getReviewsForActivity, GetDetailsForActivityResponse, GetReviewsForActivityResponse } from '@/apis/get/getActivityDetail';
import { ICON } from '@/constant/importImages';
import ImageContainer from '@/components/ImageContainer';
import Map from '@/components/Map';
import ReviewList from '@/components/ReviewList';
import FloatingCard from '@/components/FloatingCard';
import TabletCard from '@/components/FloatingCard/TabletSize';
import MobileCard from '@/components/FloatingCard/MobileSize';
import MeatBall from '@/components/Button/MeatBall';
import deleteActivity from '@/apis/delete/deleteActivity';
import useModal from '@/hooks/useModal';
import ExpandableText from '@/components/ExpandableText';
import { auth } from '@/utils/auth/api';
import DarkModeStore from '@/context/themeContext';
import ReviewPagination from '@/components/Pagination/ReviewPagination';
import DetailLayout from './layout';

/* eslint-disable */
export interface ActivityDetailsProps {
  id: number;
  page: number;
}

function ActivityDetail({ id, page }: ActivityDetailsProps) {
  const router = useRouter();
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activityIdToDelete, setActivityIdToDelete] = useState<number | null>(null);
  const { openModal, closeModal } = useModal();
  const { isDarkMode } = DarkModeStore((state) => state);

  const [currentPage, setCurrentPage] = useState<number>(page);
  const itemsPerPage = 3;
  const reviewListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsTablet(width <= 1024 && width > 768);
      setIsMobile(width <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: () => auth.getUser(),
  });

  const {
    data: activityData,
    error: activityError,
    isLoading: isLoadingActivity,
  } = useQuery<GetDetailsForActivityResponse>({
    queryKey: ['activityDetails', id],
    queryFn: () => getDetailsForActivity({ id }),
  });

  const {
    data: reviewsData,
    error: reviewsError,
    isLoading: isLoadingReviews,
  } = useQuery<GetReviewsForActivityResponse>({
    queryKey: ['activityReviews', id, currentPage],
    queryFn: () =>
      getReviewsForActivity({
        id,
        page: currentPage,
        size: itemsPerPage,
      }),
    enabled: currentPage > 0,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNavReview = () => {
    reviewListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteModal = (activityId: number) => {
    setActivityIdToDelete(activityId);
    openModal({
      modalType: 'confirm',
      content: '이 체험을 삭제하시겠습니까?',
      btnName: ['취소', '삭제하기'],
      callBackFnc: async () => {
        if (activityIdToDelete !== null) {
          try {
            const response = await deleteActivity(activityIdToDelete);
            if (response) {
              router.push('/');
            } else {
              alert('활동 삭제 실패');
            }
          } catch (error) {
            console.error('활동 삭제 실패:', error);
            alert('활동 삭제 실패. 나중에 다시 시도해주세요.');
          }
        }
        closeModal();
      },
    });
  };

  if (isLoadingActivity || isLoadingReviews) {
    return <div>Loading...</div>;
  }

  if (activityError) {
    console.error('활동 데이터 로딩 실패:', activityError);
    return <div>활동 데이터 로딩 실패</div>;
  }

  if (reviewsError) {
    console.error('리뷰 데이터 로딩 실패:', reviewsError);
    return <div>리뷰 데이터 로딩 실패</div>;
  }

  if (!activityData || !reviewsData || !userData) {
    return <div>데이터가 없습니다</div>;
  }

  const isUserActivity = activityData.userId === userData.id;

  return (
    <DetailLayout>
      <Head>
        <title>
          {activityData.title} - {activityData.category}
        </title>
        <meta name='description' content={activityData.description || 'Detailed activity description'} />
        <meta name='keywords' content={`activity, ${activityData.category}, reviews`} />
        <meta property='og:title' content={activityData.title} />
        <meta property='og:description' content={activityData.description || 'Detailed activity description'} />
        <meta property='og:image' content={activityData.bannerImageUrl} />
        <meta property='og:url' content={typeof window !== 'undefined' ? window.location.href : ''} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={activityData.title} />
        <meta name='twitter:description' content={activityData.description || 'Detailed activity description'} />
        <meta name='twitter:image' content={activityData.bannerImageUrl} />
      </Head>
      <div className='flex flex-col gap-[0.25rem]'>
        <p className='text-[1.4rem] dark:text-gray-10'>{activityData?.category}</p>
        <div className='flex items-center justify-between'>
          <h1 className='text-[3.2rem] font-bold overflow-hidden whitespace-nowrap text-ellipsis dark:text-gray-10'>{activityData?.title}</h1>
          <div className='flex items-center'>
            <div className='flex items-center'>{isUserActivity && <MeatBall editHref={`/my/activities/editactivity/${id}`} handleDelete={() => handleDeleteModal(id)} />}</div>
          </div>
        </div>

        <div className='flex gap-[1.2rem]'>
          <div className='flex gap-[0.6rem]'>
            <Image src={ICON.star.active.src} alt={ICON.star.active.alt} width={16} height={16} />
            <p className='text-[1.4rem] text-black dark:text-gray-10'>{activityData?.rating}</p>
            <p className='text-[1.4rem] text-black dark:text-gray-10 cursor-pointer relative inline-block' onClick={handleNavReview}>
              <span className='absolute left-0 bottom-0 w-full border-b-[0.1rem] border-black dark:border-gray-10' />({activityData?.reviewCount})
            </p>
          </div>

          <div className='flex gap-[0.2rem]'>
            <Image src={isDarkMode ? ICON.mapMarker.whiteColor.src : ICON.mapMarker.default.src} alt={ICON.mapMarker.default.alt} width={18} height={18} />
            <p className='text-[1.4rem] overflow-hidden whitespace-nowrap text-ellipsis dark:text-gray-10'>{activityData?.address}</p>
          </div>
        </div>

        <ImageContainer mainImageUrl={activityData?.bannerImageUrl} gridImages={activityData?.subImages} />

        <div className={`flex flex-col gap-[1.6rem] ${isUserActivity ? 'w-full' : 'md:flex-row md:gap-[1.6rem]'}`}>
          <div className={`w-full ${isUserActivity ? 'md:w-full' : 'md:w-[70%]'}`}>
            <div className='border-t-[0.2rem] border-gray-50 border-solid' />
            <div className='flex flex-col gap-[1.6rem]'>
              <p className='font-bold text-[2rem] pt-[4rem] dark:text-gray-10'>체험 설명</p>
              <ExpandableText text={activityData?.description || ''} />
            </div>
            <div className='border-t-[0.2rem] border-gray-50 border-solid my-[4rem] sm:my-[2.4rem] dark:text-gray-10' />

            <Map address={activityData?.address} />

            <div className='flex gap-[0.4rem] mt-[0.8rem]'>
              <Image src={isDarkMode ? ICON.mapMarker.whiteColor.src : ICON.mapMarker.default.src} alt={ICON.mapMarker.default.alt} width={18} height={18} />
              <p className='text-[1.4rem] max-w-[70rem] overflow-hidden whitespace-nowrap text-ellipsis dark:text-gray-10'>{activityData?.address}</p>
            </div>
            <div className='border-t-[0.2rem] border-gray-50 border-solid my-[4rem]' />

            <div ref={reviewListRef}>
              <ReviewList reviews={reviewsData?.reviews} averageRating={reviewsData?.averageRating} totalCount={reviewsData?.totalCount} />
            </div>

            <ReviewPagination itemCount={reviewsData.totalCount} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={handlePageChange} />
          </div>
          {!isUserActivity && (
            <div className='w-full md:w-[30%] mt-[1.6rem] md:mt-0'>
              {!isUserActivity && isMobile && <MobileCard schedules={activityData?.schedules} price={activityData?.price} />}
              {!isUserActivity && isTablet && <TabletCard schedules={activityData?.schedules} price={activityData?.price} />}
              {!isUserActivity && !isTablet && !isMobile && <FloatingCard schedules={activityData?.schedules} price={activityData?.price} />}
            </div>
          )}
        </div>
      </div>
    </DetailLayout>
  );
}

export default ActivityDetail;
/* eslint-enable */
