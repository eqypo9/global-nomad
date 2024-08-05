import { GetServerSideProps } from 'next';
import ActivityDetail from '.';

interface Props {
  id: number;
  page: number;
}

export default function ActivityDetails({ id, page }: Props) {
  return <ActivityDetail id={id} page={page} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id, page } = context.query;
  const activityId = typeof id === 'string' ? parseInt(id, 10) : undefined;
  const pageNumber = typeof page === 'string' ? parseInt(page, 10) : 1;

  if (activityId === undefined) {
    return { notFound: true };
  }

  return {
    props: {
      id: activityId,
      page: pageNumber,
    },
  };
};
