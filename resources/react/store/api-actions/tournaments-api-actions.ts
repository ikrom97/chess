import { generatePath } from 'react-router-dom';
import { Tournament } from '../../types/tournament';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state';
import { Tournaments } from '../../types/tournament';
import { ApiRoute } from '../../const';
import { adaptTournamentsToClient, adaptTournamentToClient } from '../../adapters/tournament-adapter';

export const fetchLastTournaments = createAsyncThunk<
  Tournaments,
  undefined,
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
>(
  'tournaments/fetchLastTournaments',
  async (_arg, { extra: api }) => {
    const { data } = await api.get(`${ApiRoute.TOURNAMENTS}`);
    const tournaments = adaptTournamentsToClient(data);
    return tournaments;
  }
);

export const paginateTournaments = createAsyncThunk<
  { tournaments: Tournaments, pagesCount: number },
  { currentPage: number },
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
>(
  'tournaments/paginateTournaments',
  async ({ currentPage }, { extra: api }) => {
    const { data } = await api.get(`${ApiRoute.TOURNAMENTS}?page=${currentPage}`);

    return {
      tournaments: adaptTournamentsToClient(data.data),
      pagesCount: data.last_page
    };
  }
);

export const fetchUpcomingTournaments = createAsyncThunk<
  Tournaments,
  undefined,
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
>(
  'tournaments/fetchUpcomingTournaments',
  async (_arg, { extra: api }) => {
    const { data } = await api.get(`${ApiRoute.TOURNAMENTS}?filter=upcoming`);
    const tournaments = adaptTournamentsToClient(data);
    return tournaments;
  }
);

export const fetchTournamentBySlug = createAsyncThunk<
  void,
  { slug: string, onSuccess: (tournament: Tournament) => void; },
  { dispatch: AppDispatch, state: State, extra: AxiosInstance }
    >(
    'tournaments/fetchTournamentBySlug',
    async ({ slug, onSuccess }, { extra: api }) => {
      const { data } = await api.get(generatePath(ApiRoute.TOURNAMENTS_SELECTED, { slug }));
      const tournament = adaptTournamentToClient(data);
      onSuccess(tournament);
    });
