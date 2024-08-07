import { GetActivitiesList } from '@/utils/types';
import CardResource from './CardResource';
import SearchActivitiesHeader from './SearchActivitiesHeader';
/* eslint-disable */
interface ActivitiesListProps {
  category?: string;
  activities?: GetActivitiesList[];
  search?: string;
  searchTotalCount?: number;
}

export default function ActivitiesList({ category = '전체', activities, search, searchTotalCount }: ActivitiesListProps) {
  return (
    <div className='flex flex-col items-start gap-[2rem] w-full'>
      {search && searchTotalCount ? (
        <>
          <SearchActivitiesHeader search={search} searchTotalCount={searchTotalCount} />
          <ul className='grid grid-cols-4 gap-[3rem]'>
            {activities?.map((activity, index) => (
              <li key={`${activity.id}-${activity.userId}-${index}`}>
                <CardResource activitiesData={activity} banner={false} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2 className='flex justify-between items-center w-full text-[3.6rem] font-[700] leading-[4.296rem] text-[#1b1b1b] dark:text-white'>
            🛼 {category || '전체 체험'}
            {/* <PostActivityButton /> */}
          </h2>
          <ul
            className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 
		  lg:gap-x-6 lg:gap-y-12 md:gap-x-6 md:gap-y-8 
		   gap-x-4 gap-y-8'
          >
            {activities?.map((activity, index) => (
              <li key={`${activity.id}-${activity.userId}-${index}`}>
                <CardResource activitiesData={activity} banner={false} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
/* eslint-enable */
