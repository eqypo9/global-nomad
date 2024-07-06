import instance from '../axios';

const getActiviy = async (activityId: string) => {
  const res = await instance.get(`/activities/${activityId}`);

  return res.data;
};
export default getActiviy