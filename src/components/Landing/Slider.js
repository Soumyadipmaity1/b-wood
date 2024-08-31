"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import s1 from './s1.jpg';
import s2 from './s2.jpg';
import s3 from './s3.png';
import s4 from './s4.png';

const Slider = () => {
  const images = [s1, s2, s3, s4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full xl:max-w-7xl lg:max-w-6xl mt-28 lg:mt-32 mx-auto">
      <div className="relative h-full overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30 lg:opacity-50 z-10"></div>
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={index} className="flex items-stretch justify-stretch w-full max-h-80 border-2 rounded-sm lg:max-h-[33rem] flex-shrink-0">
              <Image
                src={src}
                alt={`Slide ${index}`}
                layout="responsive"
                className='w-full h-full'
              />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute block top-1/2 left-4 lg:left-6 transform -translate-y-1/2 bg-white/50 hover:bg-white/70 backdrop-blur-lg p-1 lg:p-2 rounded-full shadow-md z-20 transition-all duration-150"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-black"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute block top-1/2 right-4 lg:right-6 transform -translate-y-1/2 bg-white/50 hover:bg-white/70 p-1 lg:p-2 rounded-full shadow-md z-20 transition-all duration-150"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-black"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19l7-7-7-7" />
        </svg>
      </button>
    </div>
  );
};

export default Slider;