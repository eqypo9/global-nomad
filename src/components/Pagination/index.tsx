import React from 'react';
import Image from 'next/image';
import { ICON } from '@/constant/importImages';
import DarkModeStore from '@/context/themeContext';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const { isDarkMode } = DarkModeStore((state) => state);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  let startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);

  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  const renderPageButton = (pageNumber: number) => {
    const isCurrentPage = pageNumber === currentPage;
    const buttonClasses = isCurrentPage ? 'bg-green-dark dark:bg-gray-10 text-white dark:text-[#000] border-none' : 'text-green-dark dark:text-gray-10 border-green-dark dark:border-gray-10';

    return (
      <li key={pageNumber} className='inline-block mx-1'>
        <button
          type='button'
          onClick={() => onPageChange(pageNumber)}
          disabled={currentPage === pageNumber}
          className={`flex justify-center items-center p-[1.7rem] gap-[1rem] w-[4rem] h-[4rem] md:w-[5.5rem] md:h-[5.5rem] rounded-3xl border ${buttonClasses} hover:bg-green-dark dark:hover:bg-white hover:text-white dark:hover:text-[#000] cursor-pointer text-[1.6rem]`}
          aria-label={`Page ${pageNumber}`}
        >
          {pageNumber}
        </button>
      </li>
    );
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='relative'>
        <button
          type='button'
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`flex justify-center items-center p-[1.7rem] gap-[1rem] w-[4rem] h-[4rem] md:w-[5.5rem] md:h-[5.5rem] rounded-3xl border border-green-dark dark:border-gray-10 bg-transparent cursor-pointer mx-2 text-[1.6rem] ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label='Previous Page'
        >
          <Image src={isDarkMode ? ICON.leftArrow.whiteColor.src : ICON.leftArrow.default.src} alt={isDarkMode ? ICON.leftArrow.whiteColor.alt : ICON.leftArrow.default.alt} width={20} height={20} />
        </button>
      </div>

      <ul className='flex'>{pageNumbers.map(renderPageButton)}</ul>

      <div className='relative'>
        <button
          type='button'
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`flex justify-center items-center p-[1.7rem] gap-[1rem] w-[4rem] h-[4rem] md:w-[5.5rem] md:h-[5.5rem] rounded-3xl border border-green-dark dark:border-gray-10 bg-transparent cursor-pointer mx-2 text-[1.6rem] ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label='Next Page'
        >
          <Image
            src={isDarkMode ? ICON.rightArrow.whiteColor.src : ICON.rightArrow.default.src}
            alt={isDarkMode ? ICON.rightArrow.whiteColor.alt : ICON.rightArrow.default.alt}
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
