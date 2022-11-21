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
  async ({ sort, order, count, page, keyword, onSuccess }, { extra: api }) => {
    const { data } = await api.get(
      `${ApiRoute.TOURNAMENTS}?sort=${sort}&order=${order}&count=${count}&page=${page}&keyword=${keyword ?? ''}`
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
  async ({ sort, order, count, page, onSuccess }, { extra: api }) => {
    const { data } = await api.get(
      `${ApiRoute.TOURNAMENTS_PREVIOUS}?sort=${sort}&order=${order}&count=${count}&page=${page}`
    );

    onSuccess({
      tournaments: adaptTournamentsToClient(data.data),
      pagination: adaptPaginationToClient(data),
    });
  }
);

export const fetchUpcomingTournaments = createAsyncThunk<
  Tournaments,
  { sort: string, order: string },
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
>(
  'tournaments/fetchUpcomingTournaments',
  async ({ sort, order }, { extra: api }) => {
    const { data } = await api.get(
      `${ApiRoute.TOURNAMENTS_UPCOMING}?sort=${sort}&order=${order}`
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
