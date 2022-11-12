import { createSelector } from 'reselect';
import { SliceName } from '../../const';
import { Players } from '../../types/player';
import { State } from '../../types/state';

export const getPlayers = (state: State): Players =>
  state[SliceName.PLAYERS].players;

export const getPlayersLoadedStatus = (state: State): boolean =>
  state[SliceName.PLAYERS].isPlayersLoaded;

export const getLocalPlayers = (state: State): Players =>
  state[SliceName.PLAYERS].localPlayers;

export const getLocalPlayersLoadedStatus = (state: State): boolean =>
  state[SliceName.PLAYERS].isLocalPlayersLoaded;

export const getAllPlayers = createSelector(
  [getPlayers, getLocalPlayers],
  (players, localPlayers) => [...players, ...localPlayers]
);
