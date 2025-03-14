import { useState, useEffect } from 'react';

/**
 * 특정 화면 크기 범위를 감지하는 커스텀 훅
 * @param minWidth 최소 너비 (선택)
 * @param maxWidth 최대 너비 (선택)
 * @returns boolean (해당 범위 내에 있으면 true)
 */
function useMediaQuery(minWidth?: number, maxWidth?: number): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const checkMatch = () => {
      const width = window.innerWidth;
      if (minWidth !== undefined && maxWidth !== undefined) {
        setMatches(width >= minWidth && width <= maxWidth);
      } else if (minWidth !== undefined) {
        setMatches(width >= minWidth);
      } else if (maxWidth !== undefined) {
        setMatches(width <= maxWidth);
      }
    };

    checkMatch();
    window.addEventListener('resize', checkMatch);

    return () => {
      window.removeEventListener('resize', checkMatch);
    };
  }, [minWidth, maxWidth]);

  return matches;
}

export default useMediaQuery;
