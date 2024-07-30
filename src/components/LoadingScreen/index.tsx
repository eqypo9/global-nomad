import React from 'react';
/* eslint-disable */
const LoadingScreen: React.FC = () => (
  <div className='fixed inset-0 flex space-x-2 justify-center items-center bg-white dark:invert z-50'>
    <span className='sr-only'>Loading...</span>
    <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]' />
    <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]' />
    <div className='h-8 w-8 bg-black rounded-full animate-bounce' />
  </div>
);
/* eslint-enable */
export default LoadingScreen;
