import axios from 'axios';
/* eslint-disable */
const instance = axios.create({
  baseURL: 'https://sp-globalnomad-api.vercel.app/5-7',
});

instance.interceptors.request.use((config) => {
  const newConfig = { ...config };
  const ignoreAuthPaths = [/activity-detail\/\d+/]; // 인증을 요구하지 않을 경로 패턴

  // 경로가 인증을 요구하지 않는 경로 목록에 포함되어 있는지 확인
  const isIgnoreAuthPath = ignoreAuthPaths.some((pattern) => pattern.test(newConfig.url));

  if (isIgnoreAuthPath) {
    // 임시 토큰 설정 (예: 'temporary-token' 문자열)
    newConfig.headers.Authorization = `Bearer temporary-token`;
    return newConfig; // 인증 없이 요청
  }

  if (newConfig.headers.Authorization) return newConfig;

  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    newConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  return newConfig;
});

/**
 * Axios instance with interceptors for request and response.
 *
 * The instance is pre-configured with a base URL and interceptors that handle:
 * - Adding an Authorization header with a Bearer token from localStorage to outgoing requests.
 * - Refreshing the access token if a 401 Unauthorized error is encountered, and retrying the original request.
 *
 * @example
 * import instance from '@/apis/axios';
 *
 * // Making a GET request
 * instance.get('/endpoint')
 *   .then(response => {
 *     console.log(response.data);
 *   })
 *   .catch(error => {
 *     console.error('Error:', error);
 *   });
 *
 * // Making a POST request
 * instance.post('/endpoint', { key: 'value' })
 *   .then(response => {
 *     console.log(response.data);
 *   })
 *   .catch(error => {
 *     console.error('Error:', error);
 *   });
 *
 * @returns {AxiosInstance} Configured Axios instance with interceptors.
 */
instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refreshToken');
    if (error.response?.status === 401 && !originalRequest.retryAttempt && refreshToken) {
      const res = await instance.post(
        '/auth/tokens',
        {},
        {
          headers: { Authorization: `Bearer ${refreshToken}` },
        },
      );
      const { accessToken } = res.data;
      const nextRefreshToken = res.data.refreshToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', nextRefreshToken);
      originalRequest.retryAttempt = true;

      return instance(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default instance;
/* eslint-enable */