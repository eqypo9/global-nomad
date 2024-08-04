import React from 'react';
import Image from 'next/image';
import { Review } from '@/utils/types/reviews';

interface ReviewItemProps {
  review: Review;
  isLast?: boolean;
}

function ReviewItem({ review, isLast = false }: ReviewItemProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return (
    <div className={`flex gap-[1.6rem] py-[2.4rem] ${!isLast ? 'border-b-[0.2rem] border-gray-50 border-solid' : ''}`}>
      <div className='flex-shrink-0'>
        <Image
          src={review.user.profileImageUrl || ''}
          alt={`${review.user.nickname}의 프로필 이미지`}
          width={45}
          height={45}
          className='rounded-full object-cover border border-gray-50 border-solid w-[4.5rem] h-[4.5rem]'
        />
      </div>
      <div>
        <div className='flex mb-[0.8rem]'>
          <p className='text-[1.6rem] font-bold max-w-[16rem] overflow-hidden whitespace-nowrap text-ellipsis dark:text-gray-10'>{review.user.nickname}</p>
          <p className='mx-[0.8rem] text-[1.4rem] dark:text-gray-10'>|</p>
          <p className='text-[1.6rem] text-gray-300 dark:text-gray-5'>{formatDate(review.createdAt)}</p>
        </div>
        <p className='text-[1.6rem] text-nomad-black dark:text-gray-10'>{review.content}</p>
      </div>
    </div>
  );
}

export default ReviewItem;
