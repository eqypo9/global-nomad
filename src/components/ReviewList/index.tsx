import React from 'react';
import Image from 'next/image';
import { ICON } from '@/constant/importImages';
import { Review } from '@/utils/types/reviews';
import ReviewItem from './ReviewItem';

interface ReviewListProps {
  reviews: Review[];
  averageRating: number;
  totalCount: number;
}

function ReviewList({ reviews, averageRating, totalCount }: ReviewListProps) {
  const getRating = (rating: number): string => {
    if (rating >= 4 && rating <= 5) return '매우 만족';
    if (rating >= 3 && rating < 4) return '만족';
    if (rating >= 2 && rating < 3) return '보통';
    if (rating >= 1 && rating < 2) return '불만족';
    return '후기 없음';
  };

  return (
    <>
      <div className='flex flex-col gap-[1.6rem]'>
        <p className='text-nomad-black font-bold text-[2rem] dark:text-gray-10'>후기</p>
        <div className='flex gap-[1.6rem] items-center'>
          <p className='text-[5rem] font-bold dark:text-gray-10'>{averageRating.toFixed(1)}</p>
          <div className='flex flex-col gap-[0.4rem]'>
            <p className='text-[1.8rem] text-nomad-black dark:text-gray-10'>{getRating(averageRating)}</p>
            <div className='flex items-center gap-[0.6rem]'>
              <Image src={ICON.star.active.src} alt={ICON.star.active.alt} width={16} height={16} />
              <p className='text-black text-[1.4rem] dark:text-gray-10'>{totalCount}개 후기</p>
            </div>
          </div>
        </div>
      </div>

      {totalCount === 0 ? (
        <div className='mb-[20rem]'>
          <p className='text-nomad-black text-[1.6rem] dark:text-gray-10'>등록된 후기가 없습니다.</p>
        </div>
      ) : (
        reviews.map((review, index) => <ReviewItem key={review.id} review={review} isLast={index === reviews.length - 1} />)
      )}
    </>
  );
}

export default ReviewList;
