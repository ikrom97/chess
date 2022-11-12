import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '../../const';
import { Players } from '../../types/player';

export const fetchPlayers = createAsyncThunk<
  Players,
  undefined,
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
>(
  'players/fetchPlayers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get(ApiRoute.PLAYERS);
    return data;
  }
);

export const fetchLocalPlayers = createAsyncThunk<
  Players,
  undefined,
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
>(
  'players/fetchLocalPlayers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get(`${ApiRoute.PLAYERS}?category=local`);
    return data;
  }
);
