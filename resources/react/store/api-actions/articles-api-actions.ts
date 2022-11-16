import { generatePath } from 'react-router-dom';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article, ArticlesData } from '../../types/article';
import { AppDispatch, State } from '../../types/state';
import { ApiRoute } from '../../const';
import { adaptArticlesToClient, adaptArticleToClient } from '../../adapters/article-adapter';
import { adaptPaginationToClient } from '../../adapters/pagination-adapter';

export const fetchArticles = createAsyncThunk<
  void,
  ArticlesData,
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
>(
  'articles/fetchArticles',
  async ({ orderby, ordertype, count, page, onSuccess }, { extra: api }) => {
    const { data } = await api.get(
      `${ApiRoute.ARTICLES}?orderby=${orderby}&ordertype=${ordertype}&count=${count}&page=${page}`
    );

    onSuccess({
      articles: adaptArticlesToClient(data.data),
      pagination: adaptPaginationToClient(data),
    });
  }
);

export const fetchArticleBySlug = createAsyncThunk<
  void,
  { slug: string, onSuccess: (article: Article) => void },
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
    >(
    'articles/fetchArticleBySlug',
    async ({ slug, onSuccess }, { extra: api }) => {
      const { data } = await api.get(generatePath(ApiRoute.ARTICLES_SELECTED, { slug }));
      const article = adaptArticleToClient(data);
      onSuccess(article);
    }
    );
