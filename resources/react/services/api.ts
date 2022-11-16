import axios, { AxiosError, AxiosInstance} from 'axios';
import { toast } from 'react-toastify';

const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    timeout: REQUEST_TIMEOUT,
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
        toast.error(error.response.data.error);
      }

      throw error;
    }
  );

  return api;
};
