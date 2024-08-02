import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ICON } from '@/constant';
import Button from '@/components/Button';

/* eslint-disable */
interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
}

function ImageModal({ isOpen, imageUrl, onClose }: ImageModalProps) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (imageUrl) {
      const img = new window.Image() as HTMLImageElement;
      img.src = imageUrl;
      img.onload = () => {
        setImageSize({ width: img.width, height: img.height });
      };
    }
  }, [imageUrl]);

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageUrl.split('/').pop() || 'image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const modalWidth = imageSize.width + 40; 
  const modalHeight = imageSize.height + 60; 

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' onClick={handleClose}>
      <div
        className='relative bg-white p-[1.6rem]'
        style={{
          width: `${modalWidth}px`,
          height: `${modalHeight}px`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type='button' onClick={handleClose} className='z-10 absolute top-4 right-4 p-2 cursor-pointer'>
          <Image src={ICON.close.default.src} alt={ICON.close.default.alt} width={20} height={20} />
        </button>
        <div className='flex flex-col items-center h-full'>
          <div className='relative w-full h-full '>
            <Image src={imageUrl} alt='Expanded view' layout='fill' objectFit='contain' className='rounded-md' />
          </div>
          <Button color='black' text='원본 다운로드' cssName='rounded-[0.8rem] mt-[1.6rem] text-[1.6rem]' onClick={handleDownload} />
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
/* eslint-enable */
