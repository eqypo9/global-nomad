import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

/* eslint-disable */
export function useAuthRedirect() {
  const router = useRouter();

  const redirectToSignIn = () => {
    toast.error('로그인을 먼저 해주세요', {
      position: 'bottom-center',
      autoClose: 3000,
    });
    router.push('/signin');
  };

  return redirectToSignIn;
}

/* eslint-enable */
