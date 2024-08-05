import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICON } from '@/constant';
import getMyNotifications from '@/apis/get/getMyNotifications';
import { queryKey } from '@/apis/queryKey';
import deleteNotifications from '@/apis/delete/deleteNotification';
import useCustomInfiniteQuery from '@/hooks/useCustomInfiniteQuery';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useEffect, useRef } from 'react';
import DarkModeStore from '@/context/themeContext';
import getTimeAgo from '../utils/getTimeAgo';

/* eslint-disable */
const { ellipse, xMedium } = ICON;

interface NotificationsProps {
  onClose: () => void;
  notificationButtonRef: React.RefObject<HTMLButtonElement>;
}

/**
 * Notifications component to display and manage user notifications.
 *
 * This component fetches and displays a list of user notifications using infinite scrolling.
 * Users can delete notifications, and important content within the notifications is highlighted.
 *
 * @returns {JSX.Element} The rendered Notifications component.
 */
export default function Notifications({ onClose, notificationButtonRef }: NotificationsProps) {
  const queryClient = useQueryClient();
  const observerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = DarkModeStore();

  // 외부 클릭 감지용 useEffect 추가
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        notificationButtonRef.current &&
        !notificationButtonRef.current.contains(event.target as Node) // 알림 버튼이 클릭된 것이 아닌 경우에만 닫힘
      ) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, notificationButtonRef]);

  // Fetch notifications with infinite scrolling
  const {
    fetchNextPage,
    hasNextPage,
    isFetching,
    data: notificationsData,
    isSuccess,
  } = useCustomInfiniteQuery({
    queryKey: queryKey.myNotifications,
    queryFn: ({ pageParam }: { pageParam: number | undefined }) => getMyNotifications({ pageParam }, 2),
  });

  // Mutation for deleting a notification
  const deleteNotificationMutation = useMutation({
    mutationFn: (id: number) => deleteNotifications(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKey.myNotifications }),
  });

  /**
   * Handles the deletion of a notification.
   *
   * @param {number} id - The ID of the notification to be deleted.
   */
  const handelDeleteNotification = (id: number) => {
    deleteNotificationMutation.mutate(id);
  };

  /**
   * Highlights specific words in the notification content.
   *
   * @param {string} content - The content of the notification.
   * @returns {string} The content with highlighted words.
   */
  function highlightContent(content: string) {
    if (content.includes('승인')) {
      return content.replace(/승인/g, '<span style="color: #0085ff">$&</span>');
    }
    if (content.includes('거절')) {
      return content.replace(/거절/g, '<span style="color: #ff472e">$&</span>');
    }
    return content;
  }

  /**
   * Renders the notification description with highlighted content.
   *
   * @param {string} context - The content of the notification.
   * @returns {JSX.Element} The rendered description.
   */
  const description = (context: string) => <div className='text-[1.4rem] font-normal text-black leading-[2.2rem] dark:text-gray-10' dangerouslySetInnerHTML={{ __html: highlightContent(context) }} />;

  // Use intersection observer for infinite scrolling
  useIntersectionObserver({
    observerRef,
    hasNextPage,
    isFetching,
    fetchNextPage,
  });

  return (
    <div ref={containerRef} className='absolute w-[36.8rem] p-[2rem] bg-green-light rounded-[0.8rem] h-[33.7rem] bottom-[-34rem] right-[10%] z-60 dark:bg-[black]'>
      <div className='flex flex-row justify-between '>
        <h2 className='text-[2rem] font-bold text-black dark:text-gray-10'>알림 {notificationsData?.totalCount}개</h2>
        <button onClick={onClose} className='bg-[url("/icons/Icon_X_bold.svg")] w-[2rem] h-[2rem] dark:bg-[url("/icons/Icon_X_D_bold.svg")]' />
      </div>
      <ul className={`flex flex-col items-start gap-2 mt-4 font-['Spoqa Han Sans Neo'] w-[32.8rem] h-[27rem] overflow-scroll ${notificationsData?.totalCount === 0 ? 'hidden' : ''}`}>
        {!isSuccess || notificationsData.totalCount === 0 ? (
          <h3 className='text-[1.8rem] font-semibold text-gray-600 dark:text-gray-10'>알림이 없습니다.</h3>
        ) : (
          notificationsData?.pages.map((notification: any) => (
            <li key={notification.id} className='flex flex-col items-start gap-1 p-4 bg-white w-full rounded-md border border-gray-200 dark:bg-black'>
              <div className='flex justify-between items-center w-full'>
                <Image
                  src={isDarkMode ? ICON.ellipse.active.src : ICON.ellipse.default.src} // 다크 모드 이미지 선택
                  alt={isDarkMode ? ICON.ellipse.active.src : ICON.ellipse.default.alt}
                  width={5}
                  height={5}
                  className={`${notification.content.includes('거절') ? 'filter-rejection' : ''} ${notification.content.includes('승인') ? 'filter-approval' : ''}`}
                />
                <button onClick={() => handelDeleteNotification(notification.id)}>
                  <Image src={xMedium.default.src} alt={xMedium.default.alt} width={24} height={24} />
                </button>
              </div>
              <h2>{description(notification.content)}</h2>
              <p className='text-[1.2rem] font-normal text-gray-400 dark:text-gray-10'>{getTimeAgo(notification.createdAt)}</p>
            </li>
          ))
        )}
        <div ref={observerRef} className='w-full h-4'>
          &nbsp;
        </div>
      </ul>
    </div>
  );
}
/* eslint-enable */
