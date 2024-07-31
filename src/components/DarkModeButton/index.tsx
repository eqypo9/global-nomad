import React from 'react';
import DarkModeStore from '@/context/themeContext';
/* eslint-disable */
function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = DarkModeStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleDarkMode();
  };

  return (
    <label className='relative inline-flex items-center cursor-pointer'>
      <input type='checkbox' checked={isDarkMode} onChange={handleChange} className='sr-only peer' />
      <div className='w-[3.7rem] h-[2rem] bg-gray-50 rounded-full peer-focus:outline-none dark:bg-gray-700 peer-checked:bg-gray-10 transition-colors duration-300' />
      <div className='absolute w-[1.8rem] h-[1.8rem] flex justify-center items-center bg-white rounded-full shadow-md left-1 peer-checked:translate-x-full peer-checked:left-auto dark:bg-gray-800 transition-transform duration-300'>
        {isDarkMode ? '🌙' : '🌞'}
      </div>
    </label>
  );
}

export default DarkModeToggle;
/* eslint-enable */