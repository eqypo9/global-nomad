import React from 'react';
import Image from 'next/image';
import { ICON } from '@/constant';
import { Schedule } from '@/utils/types/schedule';
import useReservation from '@/hooks/useReservation';
import useFormatPrice from '@/hooks/useFormatPrice';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import ReservationContent from '../ReservationContent';
import Button from '../Button';

/* eslint-disable */
interface FloatingCardProps {
  schedules: Schedule[];
  price: number;
  userData: any;
}

function FloatingCard({ schedules, price, userData }: FloatingCardProps) {
  const formattedPrice = useFormatPrice(price);
  const { selectedDate, selectedTime, participants, handleDateChange, handleParticipantsChange, handleTimeChange, handleReservation, isButtonDisabled, totalCost } = useReservation(schedules, price);
  const redirectToSignIn = useAuthRedirect();

  const handleReservationClick = () => {
    if (!userData) {
      redirectToSignIn();
      return;
    }
    handleReservation();
  };

  return (
    <div className='w-full max-w-[38.4rem] h-auto bg-white border-[0.2rem] border-gray-50 shadow-lg rounded-[0.8rem] p-[1rem] mt-[8rem] mx-auto dark:bg-black'>
      <div className='px-[2.4rem]'>
        <div className='flex flex-wrap items-center gap-[0.8rem] mb-[1.6rem]'>
          <p className='text-[2.8rem] font-bold dark:text-gray-10'>₩ {formattedPrice}</p>
          <p className='text-[2rem] dark:text-gray-10'> / 인</p>
        </div>
        <div className='border border-solid border-gray-50 mt-[1.6rem]' />

        <ReservationContent schedules={schedules} selectedDate={selectedDate} selectedTime={selectedTime} onDateChange={handleDateChange} onTimeChange={handleTimeChange} />

        <div className='border border-solid border-gray-50 mt-[1.6rem]' />
        <p className='my-[1.2rem] font-bold text-[2rem] dark:text-gray-10'>참여 인원 수</p>
        <div className='flex items-center gap-[0.4rem]'>
          <div className='w-[12rem] h-[4rem] flex items-center mt-[0.8rem] mb-[2.4rem] rounded-[0.6rem] border-2 border-gray-50 border-solid dark:border-gray-10 dark:bg-black'>
            <button type='button' onClick={() => handleParticipantsChange(-1)} className='px-[1.6rem] py-[0.8rem]' aria-label='Decrement participants'>
              <Image src={ICON.minusInput.default.src} alt={ICON.minusInput.default.alt} width={40} height={40} />
            </button>
            <input
              type='text'
              value={participants}
              readOnly
              className='w-full h-full p-[0.8rem] outline-none text-center text-[1.4rem] caret-transparent dark:bg-black dark:text-gray-10'
              aria-label='Number of participants'
            />
            <button type='button' onClick={() => handleParticipantsChange(1)} className='px-[1.6rem] py-[0.8rem]' aria-label='Increment participants'>
              <Image src={ICON.plusInput.default.src} alt={ICON.plusInput.default.alt} width={40} height={40} />
            </button>
          </div>
        </div>

        <div className='flex justify-center'>
          <Button text='예약하기' color='black' cssName='w-[33.6rem] h-[4.6rem] text-[1.6rem] text-bold' onClick={handleReservationClick} disabled={isButtonDisabled} />
        </div>
        <div className='border border-solid border-gray-50 mt-[1.6rem]' />
        <div className='flex flex-wrap justify-between my-[1.8rem]'>
          <p className='text-[2rem] font-bold dark:text-gray-10'>총 합계</p>
          <p className='text-[2rem] font-bold dark:text-gray-10'>₩ {useFormatPrice(totalCost)}</p>
        </div>
      </div>
    </div>
  );
}

export default FloatingCard;
/* eslint-enable */
