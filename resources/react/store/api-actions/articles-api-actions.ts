import { generatePath } from 'react-router-dom';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article, Articles } from '../../types/article';
import { AppDispatch, State } from '../../types/state';
import { ApiRoute } from '../../const';
import { adaptArticlesToClient, adaptArticleToClient } from '../../adapters/article-adapter';

export const paginateArticles = createAsyncThunk<
  { articles: Articles, pagesCount: number },
  { currentPage: number },
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
>(
  'articles/paginateArticles',
  async ({ currentPage }, { extra: api }) => {
    const { data } = await api.get(`${ApiRoute.ARTICLES}?page=${currentPage}`);

    return {
      articles: adaptArticlesToClient(data.data),
      pagesCount: data.last_page,
    };
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
