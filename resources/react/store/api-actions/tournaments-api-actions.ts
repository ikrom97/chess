import { Tournaments, TournamentsData, TournamentData } from './../../types/tournament';
import { generatePath } from 'react-router-dom';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state';
import { ApiRoute } from '../../const';
import { adaptTournamentsToClient, adaptTournamentToClient } from '../../adapters/tournament-adapter';
import { adaptPaginationToClient } from '../../adapters/pagination-adapter';

export const fetchTournaments = createAsyncThunk<
  void,
  TournamentsData,
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
>(
  'tournaments/fetchTournaments',
  async ({ orderby, ordertype, count, page, onSuccess }, { extra: api }) => {
    const { data } = await api.get(
      `${ApiRoute.TOURNAMENTS}?orderby=${orderby}&ordertype=${ordertype}&count=${count}&page=${page}`
    );

    onSuccess({
      tournaments: adaptTournamentsToClient(data.data),
      pagination: adaptPaginationToClient(data),
    });
  }
);

export const fetchPreviousTournaments = createAsyncThunk<
  void,
  TournamentsData,
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
>(
  'tournaments/fetchPreviousTournaments',
  async ({ orderby, ordertype, count, page, onSuccess }, { extra: api }) => {
    const { data } = await api.get(
      `${ApiRoute.TOURNAMENTS_PREVIOUS}?orderby=${orderby}&ordertype=${ordertype}&count=${count}&page=${page}`
    );

    onSuccess({
      tournaments: adaptTournamentsToClient(data.data),
      pagination: adaptPaginationToClient(data),
    });
  }
);

export const fetchUpcomingTournaments = createAsyncThunk<
  Tournaments,
  { orderby: string, ordertype: string },
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
>(
  'tournaments/fetchUpcomingTournaments',
  async ({ orderby, ordertype }, { extra: api }) => {
    const { data } = await api.get(
      `${ApiRoute.TOURNAMENTS_UPCOMING}?orderby=${orderby}&ordertype=${ordertype}`
    );
    const tournaments = adaptTournamentsToClient(data);

    return tournaments;
  }
);

export const fetchTournamentBySlug = createAsyncThunk<
  void,
  TournamentData,
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
>(
  'tournaments/fetchTournamentBySlug',
  async ({ slug, onSuccess }, { extra: api }) => {
    const { data } = await api.get(generatePath(ApiRoute.TOURNAMENTS_SELECTED, { slug }));
    const tournament = adaptTournamentToClient(data);
    onSuccess(tournament);
  });
