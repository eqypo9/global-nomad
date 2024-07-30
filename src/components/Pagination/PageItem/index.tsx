import React from 'react';

interface Props {
  pageNumber: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

function PageItem({ pageNumber, currentPage, onPageChange }: Props) {
  const PageLinkComponent = pageNumber === currentPage ? 'bg-green-dark dark:bg-gray-10 text-white dark:text-[#000] border-none' : 'text-green-dark dark:text-gray-10 border-green-dark dark:border-gray-10';

  return (
    <li className='inline-block mx-1'>
      <button
        type='button'
        onClick={() => onPageChange(pageNumber)}
        className={`flex justify-center items-center p-[1.7rem] gap-[1rem] w-[4rem] h-[4rem] md:w-[5.5rem] md:h-[5.5rem] rounded-3xl border ${PageLinkComponent} hover:bg-green-dark dark:hover:bg-white hover:text-white dark:hover:text-[#000] cursor-pointer text-[1.6rem]`}
      >
        {pageNumber}
      </button>
    </li>
  );
}

export default PageItem;
