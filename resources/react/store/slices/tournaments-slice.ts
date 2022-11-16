import { fetchUpcomingTournaments } from './../api-actions/tournaments-api-actions';
import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '../../const';
import { Tournaments } from '../../types/tournament';

type TournamentsSlice = {
  lastTournaments: Tournaments;
  isLastTournamentsLoaded: boolean;
  upcomingTournaments: Tournaments;
  isUpcomingTournamentsLoaded: boolean;
}

const initialState: TournamentsSlice = {
  lastTournaments: [],
  isLastTournamentsLoaded: false,
  upcomingTournaments: [],
  isUpcomingTournamentsLoaded: false,
};

export const tournamentsSlice = createSlice({
  name: SliceName.TOURNAMENTS,
  initialState,
  reducers: {
    setLastTournaments: (state, action) => {
      state.lastTournaments = action.payload;
      state.isLastTournamentsLoaded = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUpcomingTournaments.fulfilled, (state, action) => {
        state.upcomingTournaments = action.payload;
        state.isUpcomingTournamentsLoaded = true;
      });
  },
});

export const { setLastTournaments } = tournamentsSlice.actions;
