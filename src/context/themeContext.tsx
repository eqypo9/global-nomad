import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect } from 'react';

interface ThemeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const useDarkMode = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () =>
        set((state) => {
          const newMode = !state.isDarkMode;
          document.documentElement.classList.toggle('dark', newMode);
          return { isDarkMode: newMode };
        }),
    }),
    { name: 'darkMode' },
  ),
);

export function useDarkModeEffect() {
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
}

export default useDarkMode;
