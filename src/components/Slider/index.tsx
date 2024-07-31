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
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

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

  const openModal = (imageUrl: string) => {
    setModalImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageUrl(null);
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
                onClick={() => openModal(filteredImages[0])}  
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
              onClick={() => openModal(imageUrl)}  
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
      <ImageModal isOpen={isModalOpen} imageUrl={modalImageUrl || ''} onClose={closeModal} />
    </div>
  );
}

export default Slider;

/* eslint-enable */
