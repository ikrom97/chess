import { adaptNewsArrayToClient, adaptNewsToClient } from './../../adapters/news-adapter';
import { generatePath } from 'react-router-dom';
import { ApiRoute } from '../../const';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { News } from '../../types/news';
import { AppDispatch, State } from '../../types/state';

export const fetchLastNews = createAsyncThunk<
  News[],
  undefined,
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
>(
  'news/fetchLastNews',
  async (_arg, { extra: api }) => {
    const { data } = await api.get(ApiRoute.NEWS);

    return adaptNewsArrayToClient(data);
  }
);

export const paginateNews = createAsyncThunk<
  { news: News[], pagesCount: number },
  { currentPage: number },
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
>(
  'news/paginateNews',
  async ({ currentPage }, { extra: api }) => {
    const { data } = await api.get(`${ApiRoute.NEWS}?page=${currentPage}`);

    return {
      news: adaptNewsArrayToClient(data.data),
      pagesCount: data.last_page,
    };
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

