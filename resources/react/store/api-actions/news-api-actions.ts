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
  async ({ orderby, ordertype, count, page, onSuccess }, { extra: api }) => {
    const { data } = await api.get(
      `${ApiRoute.NEWS}?orderby=${orderby}&ordertype=${ordertype}&count=${count}&page=${page}`
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

