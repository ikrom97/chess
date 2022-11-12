import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute, AppRoute } from '../../const';
import { dropToken, saveToken, Token } from '../../services/token';
import { AppDispatch, State } from '../../types/state';
import { redirectToRoute } from '../action';

export const checkAuth = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
>(
  'user/checkAuth',
  async (_arg, { extra: api }) => await api.get(ApiRoute.LOGIN),
);

export const loginAction = createAsyncThunk<
  void,
  { email: string, password: string },
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<Token>(ApiRoute.LOGIN, { email, password });
    saveToken(data);
    dispatch(redirectToRoute(AppRoute.MAIN));
  },
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(ApiRoute.LOGIN);
    dropToken();
  },
);
