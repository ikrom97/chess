import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token: string = document
      .querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';

    if (token) {
      config.headers['X-CSRF-TOKEN'] = token;
    }

    config.headers['viewport'] = window.screen.width;

    return config;
  });

  return api;
};
