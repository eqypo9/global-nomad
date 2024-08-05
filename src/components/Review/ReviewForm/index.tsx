import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import postMyReview from '@/apis/post/postMyReview';

import Button from '@/components/Button';
import useModal from '@/hooks/useModal';
import RatingInput from '../RatingInput';

interface FormData {
  rating: number;
  content: string;
}

interface Props {
  id: number;
  onClickCloseModal: () => void;
  currentFilterOption: string | undefined;
  refreshReservationList: (filterOption: string | undefined) => Promise<void>;
}

export default function ReviewForm({ id, onClickCloseModal, currentFilterOption, refreshReservationList }: Props) {
  // const queryClient = useQueryClient();
  const { control, handleSubmit, setValue, register } = useForm<FormData>({
    defaultValues: { rating: 0, content: '' },
  });
  const { openModal } = useModal();

  const postReviewMutation = useMutation({
    mutationFn: (data: FormData) => postMyReview(id, data),
    onSuccess: () => {
      onClickCloseModal();
      refreshReservationList(currentFilterOption);
      // queryClient.invalidateQueries({ queryKey: ['MyReservations'] });
    },
  });

  const submit: SubmitHandler<FormData> = (data): void => {
    if (data.rating === 0) {
      openModal({ btnName: ['확인'], modalType: 'alert', content: '별점을 선택해 주세요.' });
      return;
    }
    postReviewMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-col gap-[2.4rem]'>
      <RatingInput control={control} setValue={setValue} />
      <textarea
        {...register('content', { required: '후기를 작성해 주세요' })}
        className='text-[1.6rem] dark:text-gray-10 border border-gray-400 dark:bg-black dark:border-gray-10 w-full md:h-[22.4rem] h-[40vh] resize-none p-2 px-4 rounded-md'
        placeholder='후기를 작성해주세요'
      />
      <Button type='submit' color='black' text='작성하기' cssName='py-[1.5rem] text-[1.6rem] leading-[2.6rem] font-[700]' />
    </form>
  );
}
