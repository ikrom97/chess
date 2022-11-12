import { fetchLastTournaments, paginateTournaments, fetchUpcomingTournaments } from '../api-actions/tournaments-api-actions';
import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '../../const';
import { Tournaments } from '../../types/tournament';

type TournamentsSlice = {
  lastTournaments: Tournaments;
  isLastTournamentsLoaded: boolean;
  paginatedTournaments: Tournaments;
  pagesCount: number;
  upcomingTournaments: Tournaments;
  isUpcomingTournamentsLoaded: boolean;
}

const initialState: TournamentsSlice = {
  lastTournaments: [],
  isLastTournamentsLoaded: false,
  paginatedTournaments: [],
  pagesCount: 0,
  upcomingTournaments: [],
  isUpcomingTournamentsLoaded: false,
};

export const tournamentsSlice = createSlice({
  name: SliceName.TOURNAMENTS,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLastTournaments.fulfilled, (state, action) => {
        state.lastTournaments = action.payload;
        state.isLastTournamentsLoaded = true;
      })
      .addCase(paginateTournaments.fulfilled, (state, action) => {
        const { tournaments, pagesCount } = action.payload;
        state.paginatedTournaments = tournaments;
        state.pagesCount = pagesCount;
      })
      .addCase(fetchUpcomingTournaments.fulfilled, (state, action) => {
        state.upcomingTournaments = action.payload;
        state.isUpcomingTournamentsLoaded = true;
      });
  },
});
