import { ICON } from '@/constant/importImages';
import useOutsideClick from '@/hooks/useOutsideClick';
import useToggleButton from '@/hooks/useToggleButton';
import Image from 'next/image';
import { Dispatch, SetStateAction, useRef } from 'react';
import DropdownMenu from '../DropdownMenu';
/* eslint-disable */
interface FilterProps {
  type: 'price' | 'filter';
  filterState: string;
  setFilterState: Dispatch<SetStateAction<string>>;
}

interface FilterTypeProps {
  [type: string]: {
    text?: string;
    list: {
      text: string;
      handleClick: () => void;
    }[];
  };
}

export default function Filter({ type, filterState, setFilterState }: FilterProps) {
  const { isToggle: isOpen, handleToggleClick: isOpenToggle } = useToggleButton();
  const ref = useRef<HTMLButtonElement>(null);

  useOutsideClick(ref, isOpen, isOpenToggle);

  const handleDropdownOptionClick = (option: string) => {
    setFilterState(option);
    isOpenToggle();
  };

  const FilterType: FilterTypeProps = {
    price: {
      text: {
        '': '정렬',
        latest: '최신순',
        price_asc: '낮은 가격순',
        price_desc: '높은 가격순',
      }[filterState],
      list: [
        {
          text: '최신순',
          handleClick: () => handleDropdownOptionClick('latest'),
        },
        {
          text: '낮은 가격순',
          handleClick: () => handleDropdownOptionClick('price_asc'),
        },
        {
          text: '높은 가격순',
          handleClick: () => handleDropdownOptionClick('price_desc'),
        },
      ],
    },
    filter: {
      text: {
        '': '전체',
        pending: '예약 신청',
        canceled: '예약 취소',
        confirmed: '예약 승인',
        declined: '예약 거절',
        completed: '체험 완료',
      }[filterState],
      list: [
        {
          text: '전체',
          handleClick: () => handleDropdownOptionClick(''),
        },
        {
          text: '예약 신청',
          handleClick: () => handleDropdownOptionClick('pending'),
        },
        {
          text: '예약 취소',
          handleClick: () => handleDropdownOptionClick('canceled'),
        },
        {
          text: '예약 승인',
          handleClick: () => handleDropdownOptionClick('confirmed'),
        },
        {
          text: '예약 거절',
          handleClick: () => handleDropdownOptionClick('declined'),
        },
        {
          text: '체험 완료',
          handleClick: () => handleDropdownOptionClick('completed'),
        },
      ],
    },
  };

  return (
    <div className='relative w-fit min-w-[13rem]'>
      <button
        className='sm:w-[16rem] w-[10.7rem] py-[1rem] px-[2rem] md:py-[1.6rem] rounded-[1.5rem] border text-[#0B3B2D] dark:text-gray-10 text-[1.8rem] font-[500] bg-[#FFFFFF] dark:bg-black border-[#0B3B2D] dark:border-gray-10 flex items-center justify-between'
        onClick={isOpenToggle}
        ref={ref}
      >
        <span>{FilterType[type].text}</span>
        <div className={`${isOpen ? 'rotate-180' : ''}`}>
          <Image src={ICON.filter.default.src} alt={ICON.filter.default.alt} height={22} width={22} />
        </div>
      </button>
      {isOpen && <DropdownMenu dropdownMenuList={FilterType[type].list} />}
    </div>
  );
}
/* eslint-enable */
