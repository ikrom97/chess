import { NewsData } from './../../types/news';
import { adaptNewsArrayToClient, adaptNewsToClient } from './../../adapters/news-adapter';
import { generatePath } from 'react-router-dom';
import { ApiRoute } from '../../const';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { News } from '../../types/news';
import { AppDispatch, State } from '../../types/state';
import { adaptPaginationToClient } from '../../adapters/pagination-adapter';

export const fetchNews = createAsyncThunk<
  void,
  NewsData,
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
>(
  'news/fetchNews',
  async ({ sort, order, count, page, keyword, onSuccess }, { extra: api }) => {
    const { data } = await api.get(
      `${ApiRoute.NEWS}?sort=${sort}&order=${order}&count=${count}&page=${page}&keyword=${keyword ?? ''}`
    );

    onSuccess({
      news: adaptNewsArrayToClient(data.data),
      pagination: adaptPaginationToClient(data),
    });
  }
);

export const fetchNewsBySlug = createAsyncThunk<
  void,
  { slug: string, onSuccess: (news: News) => void },
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
    >(
    'news/fetchNewsBySlug',
    async ({ slug, onSuccess }, { extra: api }) => {
      const { data } = await api.get(generatePath(ApiRoute.NEWS_SELECTED, { slug }));
      const news = adaptNewsToClient(data);
      onSuccess(news);
    }
    );

export const storeNews = createAsyncThunk<
  void,
  { form: FormData, onSuccess: () => void },
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
    >(
    'news/storeNews',
    async ({ form, onSuccess }, { extra: api }) => {
      await api.post(ApiRoute.NEWS, form);
      onSuccess();
    });

export const updateNews = createAsyncThunk<
  void,
  { form: FormData, onSuccess: (updatedNews: News) => void },
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
    >(
    'news/updateNews',
    async ({ form, onSuccess }, { extra: api }) => {
      const { data } = await api.post('/api/news/update', form);
      onSuccess(adaptNewsToClient(data.news));
    });

export const deleteNews = createAsyncThunk<
  void,
  { ids: number[], onSuccess: () => void; },
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
    >(
    'news/deleteNews',
    async ({ ids, onSuccess }, { extra: api }) => {
      await api.post('/api/news/delete', { ids });
      onSuccess();
    });
