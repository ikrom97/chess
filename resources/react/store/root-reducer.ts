import { userSlice } from './slices/user-slice';
import { combineReducers } from '@reduxjs/toolkit';
import { SliceName } from '../const';
import { articlesSlice } from './slices/articles-slice';
import { newsSlice } from './slices/news-slice';
import { playersSlice } from './slices/players-slice';
import { tournamentsSlice } from './slices/tournaments-slice';

export const rootReducer = combineReducers({
  [SliceName.ARTICLES]: articlesSlice.reducer,
  [SliceName.NEWS]: newsSlice.reducer,
  [SliceName.PLAYERS]: playersSlice.reducer,
  [SliceName.TOURNAMENTS]: tournamentsSlice.reducer,
  [SliceName.USER]: userSlice.reducer,
});
