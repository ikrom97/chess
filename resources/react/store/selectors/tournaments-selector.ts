import { SliceName } from '../../const';
import { State } from '../../types/state';
import { Tournaments } from '../../types/tournament';

export const getLastTournaments = (state: State): Tournaments =>
  state[SliceName.TOURNAMENTS].lastTournaments;

export const getLastTournamentsLoadedStatus = (state: State): boolean =>
  state[SliceName.TOURNAMENTS].isLastTournamentsLoaded;

export const getUpcomingTournaments = (state: State): Tournaments =>
  state[SliceName.TOURNAMENTS].upcomingTournaments;

export const getUpcomingTournamentsLoadedStatus = (state: State): boolean =>
  state[SliceName.TOURNAMENTS].isUpcomingTournamentsLoaded;
