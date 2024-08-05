import React, { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { ICON } from '@/constant';
import { Schedule } from '@/utils/types/schedule';
import Button from '../Button';
import ReservationContent from '../ReservationContent';
import DarkModeStore from '@/context/themeContext';

/* eslint-disable */

interface CustomPopupProps {
  schedules: Schedule[];
  selectedDate: Date | null;
  selectedTime: number | null;
  onClose: () => void;
  onDateChange: (date: Date | null) => void;
  onTimeChange: (id: number) => void;
  setSelectedTimeText: (text: string) => void;
}

function CustomPopup({ schedules, selectedDate, selectedTime, onClose, onDateChange, onTimeChange, setSelectedTimeText }: CustomPopupProps) {
  const [currentDate, setCurrentDate] = useState<Date | null>(selectedDate || null);
  const { isDarkMode } = DarkModeStore((state) => state);

  const isButtonDisabled = selectedTime === null || currentDate === null;

  const handleDateChange = (date: Date | null) => {
    setCurrentDate(date);
    onDateChange(date);
  };

  const handleClose = () => {
    const formattedDate = currentDate ? format(currentDate, 'yy/MM/dd') : '';
    const selectedSchedule = schedules.find((schedule) => schedule.id === selectedTime);
    const selectedTimeRange = selectedSchedule ? `${selectedSchedule.startTime} ~ ${selectedSchedule.endTime}` : '';
    if (selectedTime !== null && currentDate !== null) {
      setSelectedTimeText(`${formattedDate} ${selectedTimeRange}`);
    }
    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-[1000]'>
      <div className='fixed inset-0 bg-transparent bg-opacity-40 z-[-1]' />
      <div
        className={`relative px-[2.4rem] bg-white rounded-[2.4rem] shadow-lg p-4 w-full h-full max-h-full md:max-w-[48rem] md:max-h-[60rem] ${isDarkMode ? 'dark:bg-black dark:border-gray-10' : 'bg-white border-gray-300'}`}
        style={{ borderColor: isDarkMode ? 'gray-10' : 'gray-300' }}
      >
        <button type='button' onClick={handleClose} className='absolute top-4 right-4 p-2'>
          <Image src={isDarkMode ? ICON.darkClose.default.src : ICON.close.default.src} alt={isDarkMode ? ICON.darkClose.default.alt : ICON.close.default.alt} width={30} height={30} />
        </button>
        <ReservationContent schedules={schedules} selectedDate={currentDate} selectedTime={selectedTime} onDateChange={handleDateChange} onTimeChange={onTimeChange} dateTextSize='2.8rem' />
        <div className='flex justify-center mt-[6.4rem] mb-[3.2rem]'>
          <Button text='확인' color='black' cssName='w-full max-w-[43.2rem] h-[5.6rem] text-[1.6rem] font-bold' onClick={handleClose} disabled={isButtonDisabled} style={{ position: 'absolute', bottom: '4rem' }} />
        </div>
      </div>
    </div>
  );
}

export default CustomPopup;

/* eslint-enable */
