import { AuthorizationStatus, SliceName } from '../../const';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[SliceName.USER].authorizationStatus;
