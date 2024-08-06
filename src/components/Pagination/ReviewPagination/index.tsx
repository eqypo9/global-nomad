import React from 'react';
import Pagination from '..';

interface ReviewPaginationProps {
  itemCount: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function ReviewPagination({ itemCount, itemsPerPage, currentPage, onPageChange }: ReviewPaginationProps) {
  const totalPages = Math.ceil(itemCount / itemsPerPage);

  return (
    <div className='flex justify-center items-center mt-[7.2rem] mb-[41.3rem]'>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
    </div>
  );
}

export default ReviewPagination;
