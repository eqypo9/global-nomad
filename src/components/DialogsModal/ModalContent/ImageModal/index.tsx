import React from 'react';
import Image from 'next/image';

/* eslint-disable */
interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
}

function ImageModal({ isOpen, imageUrl, onClose }: ImageModalProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' onClick={onClose}>
      <div className='relative w-[80rem] h-[60rem] bg-white' onClick={(e) => e.stopPropagation()}>
        <Image src={imageUrl} alt='Expanded view' layout='fill' objectFit='contain' className='rounded-md' />
      </div>
    </div>
  );
}

export default ImageModal;
/* eslint-enable */
