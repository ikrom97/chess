import { SliceName } from '../../const';
import { Articles } from '../../types/article';
import { State } from '../../types/state';

export const getPaginatedArticles = (state: State): Articles =>
  state[SliceName.ARTICLES].paginatedArticles;

export const getArticlePagesCount = (state: State): number =>
  state[SliceName.ARTICLES].pagesCount;
