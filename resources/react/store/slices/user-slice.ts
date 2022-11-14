import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, SliceName } from '../../const';
import { checkAuth, loginAction, logoutAction } from '../api-actions/user-api-actions';

type UserSlice = {
  authorizationStatus: AuthorizationStatus;
}

const initialState: UserSlice = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
};

export const userSlice = createSlice({
  name: SliceName.USER,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuth.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.AUTH;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.AUTH;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      });
  },
});
