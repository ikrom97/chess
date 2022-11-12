import { fetchLocalPlayers, fetchPlayers } from '../api-actions/players-api-actions';
import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '../../const';
import { Players } from '../../types/player';

type PlayersSlice = {
  players: Players;
  isPlayersLoaded: boolean;
  localPlayers: Players;
  isLocalPlayersLoaded: boolean;
}

const initialState: PlayersSlice = {
  players: [],
  isPlayersLoaded: false,
  localPlayers: [],
  isLocalPlayersLoaded: false,
};

export const playersSlice = createSlice({
  name: SliceName.PLAYERS,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.players = action.payload;
        state.isPlayersLoaded = true;
      })
      .addCase(fetchLocalPlayers.fulfilled, (state, action) => {
        state.localPlayers = action.payload;
        state.isLocalPlayersLoaded = true;
      });
  },
});
