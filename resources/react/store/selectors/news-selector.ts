import { SliceName } from '../../const';
import { News } from '../../types/news';
import { State } from '../../types/state';

export const getLastNews = (state: State): News[] =>
  state[SliceName.NEWS].lastNews;

export const getLastNewsLoadedStatus = (state: State): boolean =>
  state[SliceName.NEWS].isLastNewsLoaded;
