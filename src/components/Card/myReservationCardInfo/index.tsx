import patchCancelMyReservation from '@/apis/patch/patchCancelMyReservation';
import Button from '@/components/Button';
import Review from '@/components/Review';
import useModal from '@/hooks/useModal';
import { IReservationCardInfo } from '@/types/ReservationInfo';
import setReservationStatueInfo from '@/utils/setReservationStatueInfo';
import { useState } from 'react';

export default function MyReservationCardInfo({
  data,
  currentFilterOption,
  refreshReservationList,
}: {
  data: IReservationCardInfo;
  currentFilterOption: string | undefined;
  refreshReservationList: (filterOption: string | undefined) => Promise<void>;
}) {
  const { openModal, closeModal } = useModal();
  const { activity, status, totalPrice, date, startTime, endTime, headCount } = data;
  const statusInfo = setReservationStatueInfo(status);
  const btnCss = 'w-[8rem] sm:w-[12.1rem] h-[4rem] sm:text-[1.4rem] text-[1.2rem] font-[700]';
  const [reviewModalState, setModalState] = useState(false);

  const handleOpenReview = () => {
    setModalState(true);
  };

  const handleCloseReview = () => {
    setModalState(false);
  };

  const handleCancelReservation = async () => {
    const result = await patchCancelMyReservation(data.id);
    if (result) {
      refreshReservationList(currentFilterOption);
    }
    closeModal();
  };

  const handleOpenCancelConfirm = () => {
    openModal({
      modalType: 'confirm',
      btnName: ['아니오', '네'],
      content: '예약을 취소하시겠습니까?',
      callBackFnc: handleCancelReservation,
    });
  };

  return (
    <>
      <div className='relative flex flex-col justify-center w-full'>
        <span className={`leading-[2.6rem] font-[700] sm:text-[1.6rem] text-[1.4rem] ${statusInfo.btnColor}`}>{statusInfo.name}</span>
        <h3 className='sm:text-[2rem] text-[1.4rem] font-[700] sm:leading-[2.6rem] leading-[2.4rem] text-[#112211] lg:mt-[0.8rem]'>{activity.title}</h3>
        <span className='sm:text-[1.8rem] text-[1.2rem] font-[400] sm:leading-[2.4rem] leading-[1.8rem] lg:pt-[1.2rem] md:pt-[0.5rem]'>
          {date} · {startTime} - {endTime} · {headCount}명
        </span>
        <div className='flex justify-between items-center lg:mt-[1.6rem] md:mt-[1rem]'>
          <span className='sm:text-[2.4rem] text-[1.6rem] text-[#1b1b1b] sm:leading-[2.864rem] leading-[2.6rem] font-[500]'>
            {'\uFFE6'}
            {totalPrice.toLocaleString('ko-KR')}
          </span>
          {statusInfo.name === '예약 신청' && <Button text='예약 취소' color='white' cssName={btnCss} onClick={handleOpenCancelConfirm} />}
          {statusInfo.name === '체험 완료' && <Button text='후기 작성' color='black' cssName={btnCss} onClick={handleOpenReview} />}
        </div>
      </div>
      {reviewModalState && <Review closeModal={handleCloseReview} reservationInfo={data} />}
    </>
  );
}
