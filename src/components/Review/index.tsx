import useModalScrollBlock from '@/hooks/useModalScrollBlock';
import Image from 'next/image';
import { ICON } from '@/constant/importImages';
import { IReservationCardInfo } from '@/types/ReservationInfo';
import ReviewForm from './ReviewForm';

interface IReviewProps {
  closeModal: () => void;
  reservationInfo: IReservationCardInfo;
  currentFilterOption: string | undefined;
  refreshReservationList: (filterOption: string | undefined) => Promise<void>;
}

function Review({ closeModal, reservationInfo, currentFilterOption, refreshReservationList }: IReviewProps) {
  useModalScrollBlock();

  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 bg-var-modal-bg z-[990]'>
      <div className='pt-[2.8rem] px-[2.4rem] md:rounded-[0.8rem] fixed md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 bg-[#FFFFFF] md:w-[48rem] md:max-h-[90vh] overflow-auto dark:border dark:border-gray-10 dark:bg-black w-full h-full md:h-auto'>
        <div className='flex justify-between items-center'>
          <h2 className='text-[2.8rem] text-black font-[700] leading-[2.6rem] dark:text-gray-10'>후기 작성</h2>
          <button type='button' onClick={closeModal}>
            <Image width={40} height={40} src={ICON.x.default.src} alt={ICON.x.default.alt} />
          </button>
        </div>
        <div className='flex flex-col gap-[2.4rem] pt-[4.1rem] pb-[4.6rem]'>
          <div className='flex justify-between'>
            <div className='relative w-[12.6rem] h-[12.6rem] rounded-[1.2rem] bg-lightgray overflow-hidden'>
              <Image fill alt='체험 이미지' src={reservationInfo.activity.bannerImageUrl} />
            </div>
            <div className='flex flex-col gap-[1.2rem]'>
              <span className='text-[2rem] dark:text-gray-10 font-[700] leading-[2.6rem]'>{reservationInfo.activity.title}</span>
              <span className='text-[1.8rem] dark:text-gray-10 font-[400] leading-[2.4rem]'>
                {reservationInfo.date} · {reservationInfo.startTime} - {reservationInfo.endTime} · {reservationInfo.headCount}명
              </span>
              <span className='text-[3.2rem] dark:text-gray-10 leading-[3.819rem] font-[700] pt-[1.2rem] border-t border-opacity-10'>
                {'\uFFE6'}
                {reservationInfo.totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
          <ReviewForm id={reservationInfo.id} onClickCloseModal={closeModal} currentFilterOption={currentFilterOption} refreshReservationList={refreshReservationList} />
        </div>
      </div>
    </div>
  );
}

export default Review;
