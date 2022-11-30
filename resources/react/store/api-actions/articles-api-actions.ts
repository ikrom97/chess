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
  async ({ sort, order, count, page, keyword, onSuccess }, { extra: api }) => {
    const { data } = await api.get(
      `${ApiRoute.ARTICLES}?sort=${sort}&order=${order}&count=${count}&page=${page}&keyword=${keyword ?? ''}`
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

export const storeArticle = createAsyncThunk<
  void,
  { form: FormData, onSuccess: () => void },
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
    >(
    'articles/storeArticle',
    async ({ form, onSuccess }, { extra: api }) => {
      await api.post(ApiRoute.ARTICLES, form);
      onSuccess();
    });

export const updateArticle = createAsyncThunk<
  void,
  { form: FormData, onSuccess: (updatedArticle: Article) => void },
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
    >(
    'articles/updateArticle',
    async ({ form, onSuccess }, { extra: api }) => {
      const { data } = await api.post('/api/articles/update', form);
      onSuccess(adaptArticleToClient(data.article));
    });

export const deleteArticles = createAsyncThunk<
  void,
  { ids: number[], onSuccess: () => void; },
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
    >(
    'articles/deleteArticle',
    async ({ ids, onSuccess }, { extra: api }) => {
      await api.post('/api/articles/delete', { ids });
      onSuccess();
    });

