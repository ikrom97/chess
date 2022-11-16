import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '../../const';
import { News } from '../../types/news';

type NewsSlice = {
  lastNews: News[];
  isLastNewsLoaded: boolean;
}

const initialState: NewsSlice = {
  lastNews: [],
  isLastNewsLoaded: false,
};

export const newsSlice = createSlice({
  name: SliceName.NEWS,
  initialState,
  reducers: {
    setLastNews: (state, action) => {
      state.lastNews = action.payload;
      state.isLastNewsLoaded = true;
    },
  },
});

export const { setLastNews } = newsSlice.actions;
