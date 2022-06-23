import { useAppContext } from '../context/appContext';
import axios from 'axios';

const useAuthFetch = () => {
  const { state, dispatch } = useAppContext();

  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  // request interceptor
  authFetch.interceptors.request.use(
    (config) => {
      // action before request is sent
      config.headers.common['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      // if request error
      return Promise.reject(error);
    }
  );
  // response interceptor
  authFetch.interceptors.response.use(
    (response) => {
      // trigger when when status code lies in range 2xx
      return response;
    },
    (error) => {
      // trigger when status code falls outside the range of 2xx
      if (error.response.status === 401) {
        dispatch({
          type: 'LOGOUT_USER',
        });
      }
      return Promise.reject(error);
    }
  );
  return authFetch;
};

export default useAuthFetch;
