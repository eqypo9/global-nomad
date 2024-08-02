import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { ICON } from '@/constant';
import Button from '@/components/Button';
import styles from '@/styles/slider.module.css';

/* eslint-disable */

interface ImageModalProps {
  isOpen: boolean;
  images: string[];
  onClose: () => void;
  initialSlide?: number;
}

function ImageModal({ isOpen, images, onClose, initialSlide = 0 }: ImageModalProps) {
  const [activeSlide, setActiveSlide] = useState(initialSlide);

  useEffect(() => {
    if (isOpen) {
      setActiveSlide(initialSlide);
    }
  }, [isOpen, initialSlide]);

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  const handleDownload = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageUrl.split('/').pop() || 'image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const modalWidth = 800;
  const modalHeight = 600;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' onClick={handleClose}>
      <div
        className='relative bg-white border rounded-lg p-[1.6rem] flex flex-col items-center'
        style={{
          width: `${modalWidth}px`,
          height: `${modalHeight}px`,
          maxWidth: '90vw',
          maxHeight: '90vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type='button' onClick={handleClose} className='z-10 absolute top-4 right-4 p-2 cursor-pointer'>
          <Image src={ICON.close.default.src} alt={ICON.close.default.alt} width={40} height={40} />
        </button>
        <div className='relative w-full h-full flex items-center justify-center overflow-hidden'>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={30}
            initialSlide={activeSlide}
            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
            className={`w-full h-full ${styles.customSwiper}`}
          >
            {images.map((imageUrl, index) => (
              <SwiperSlide key={index}>
                <div className='relative w-full h-full'>
                  <Image src={imageUrl} alt={`Slide ${index}`} layout='fill' objectFit='contain' className='rounded-md' />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <Button color='black' text='원본 다운로드' cssName='rounded-[0.8rem] mt-[1.6rem] text-[1.6rem]' onClick={() => handleDownload(images[activeSlide])} />
      </div>
    </div>
  );
}

export default ImageModal;
/* eslint-enable */
