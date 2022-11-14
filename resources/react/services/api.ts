import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers['viewport'] = window.screen.width;

    return config;
  });

  api.interceptors.response.use(
    (response) => {
      if (response.data.message) {
        toast.success(response.data.message);
      }
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        toast.warn(error.response.data.error);
      }

      throw error;
    }
  );

  return api;
};
