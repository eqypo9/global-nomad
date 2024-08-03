import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/styles/slider.module.css';
import ImageModal from '../DialogsModal/ModalContent/ImageModal';

/* eslint-disable */
interface SliderProps {
  images: string[];
  defaultImage: string;
}

function Slider({ images, defaultImage }: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);

  const filteredImages = images.filter((image) => image !== defaultImage);

  useEffect(() => {
    if (filteredImages.length > 1) {
      const slideInterval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % filteredImages.length);
      }, 3000);

      return () => clearInterval(slideInterval);
    }
  }, [filteredImages.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const openModal = (index: number) => {
    setInitialSlide(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setInitialSlide(0);
  };

  if (filteredImages.length <= 1) {
    return (
      <div className={styles['slider-container']}>
        {filteredImages.length === 1 && (
          <div className={styles.slider}>
            <div className={styles.slide}>
              <Image
                src={filteredImages[0]}
                alt='slide'
                layout='fill'
                objectFit='cover'
                onClick={() => openModal(0)}
                className={styles.image}  
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles['slider-container']}>
      <button
        className={`${styles['slider-button']} ${styles.prev}`}
        onClick={prevSlide}
        aria-label="Previous slide"
      />
      <div className={styles.slider}>
        {filteredImages.map((imageUrl, index) => (
          <div key={imageUrl} className={`${styles.slide} ${currentSlide === index ? styles.active : ''}`}>
            <Image
              src={imageUrl}
              alt={`slide ${index}`}
              layout='fill'
              objectFit='cover'
              onClick={() => openModal(index)}
              className={styles.image}  
            />
          </div>
        ))}
        <div className={styles.dots}>
          {filteredImages.map((_, index) => (
            <div
              key={index}
              className={`${styles.dot} ${currentSlide === index ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
      <button
        className={`${styles['slider-button']} ${styles.next}`}
        onClick={nextSlide}
        aria-label="Next slide"
      />
      <ImageModal isOpen={isModalOpen} images={filteredImages} initialSlide={initialSlide} onClose={closeModal} />
    </div>
  );
}

export default Slider;
/* eslint-enable */
