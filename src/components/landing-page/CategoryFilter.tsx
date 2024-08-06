
import useResponsiveSize from '@/hooks/useResponsiveSize';
import useCategoryFilterStore from '@/utils/landing-page/useCategoryFilterStore';
import { useEffect, useRef, useState } from 'react';
import Filter from './Filter';
import Category from './Category';
/* eslint-disable */
export default function CategoryFilter() {
  const [categoryState, setCategoryState] = useState('');
  const [filterState, setFilterState] = useState('');
  const [categoryXState, setCategoryXState] = useState(0);

  const translateSize = useResponsiveSize(1, 1, 2, 3);
  const categoryRef = useRef<HTMLUListElement>(null);

  const { mainCategory, setMainCategory, mainFilter, setMainFilter } = useCategoryFilterStore();

  const categoryList: ('문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙')[] = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

  const handleCategoryClick = (category: string) => {
    setFilterState('');
    if (category === categoryState) {
      setCategoryState('');
      return;
    }
    setCategoryState(category);
  };

  const handleButtonClick = (direction: number) => {
    const newIndex = categoryXState + direction;

    if (newIndex >= 0 && newIndex <= translateSize) {
      setCategoryXState(newIndex);
    }
  };

  useEffect(() => {
    if (categoryRef.current !== null) {
      categoryRef.current.style.transition = 'all 0.5s ease-in-out';
    }

    if (categoryRef.current !== null) {
      categoryRef.current.style.transform = `translateX(-${categoryXState * 50}%)`;
    }
  }, [categoryXState, translateSize]);

  useEffect(() => {
    setMainCategory(categoryState);
    setFilterState('');
    setMainFilter('');
  }, [categoryState, setMainCategory, setMainFilter]);

  useEffect(() => {
    setMainFilter(filterState);
  }, [filterState, setMainFilter]);

  return (
    <div className='flex justify-between items-center w-full min-w-0'>
      <div className='flex items-center relative min-w-0'>
        <div className='overflow-hidden'>
          <ul className='flex gap-[2.4rem] md:gap-[1.6rem] sm:gap-[0.8rem]' ref={categoryRef}>
            {categoryList.map((category, index) => (
              <li key={`${category}-${index}`} className='flex-shrink-0'>
                <Category category={category} isActive={categoryState === category} onClick={handleCategoryClick} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <Filter type='price' filterState={filterState} setFilterState={setFilterState} />
      </div>
    </div>
  );
}
/* eslint-enable */
