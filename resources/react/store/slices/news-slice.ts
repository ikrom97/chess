import { fetchLastNews, paginateNews } from '../api-actions/news-api-actions';
import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '../../const';
import { News } from '../../types/news';

type NewsSlice = {
  lastNews: News[];
  isLastNewsLoaded: boolean;
  paginatedNews: News[];
  pagesCount: number,
}

const initialState: NewsSlice = {
  lastNews: [],
  isLastNewsLoaded: false,
  paginatedNews: [],
  pagesCount: 0,
};

export const newsSlice = createSlice({
  name: SliceName.NEWS,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLastNews.fulfilled, (state, action) => {
        state.lastNews = action.payload;
        state.isLastNewsLoaded = true;
      })
      .addCase(paginateNews.fulfilled, (state, action) => {
        const { news, pagesCount } = action.payload;
        state.paginatedNews = news;
        state.pagesCount = pagesCount;
      });
  }
});
