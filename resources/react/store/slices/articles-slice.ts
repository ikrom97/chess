import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '../../const';
import { Articles } from '../../types/article';
import { paginateArticles } from '../api-actions/articles-api-actions';

type ArticlesSlice = {
  paginatedArticles: Articles;
  pagesCount: number,
}

const initialState: ArticlesSlice = {
  paginatedArticles: [],
  pagesCount: 0,
};

export const articlesSlice = createSlice({
  name: SliceName.ARTICLES,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(paginateArticles.fulfilled, (state, action) => {
        const { articles, pagesCount } = action.payload;
        state.paginatedArticles = articles;
        state.pagesCount = pagesCount;
      });
  }
});
