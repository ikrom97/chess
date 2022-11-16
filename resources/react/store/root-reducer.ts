import { userSlice } from './slices/user-slice';
import { combineReducers } from '@reduxjs/toolkit';
import { SliceName } from '../const';
import { newsSlice } from './slices/news-slice';
import { playersSlice } from './slices/players-slice';
import { tournamentsSlice } from './slices/tournaments-slice';

export const rootReducer = combineReducers({
  [SliceName.NEWS]: newsSlice.reducer,
  [SliceName.PLAYERS]: playersSlice.reducer,
  [SliceName.TOURNAMENTS]: tournamentsSlice.reducer,
  [SliceName.USER]: userSlice.reducer,
});
