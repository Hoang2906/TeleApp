import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import UserModel from '../../networks/models/UserModel';

export interface AuthState {
  user: UserModel | undefined;
}

const initialState: AuthState = {
  user: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserModel>) => {
      state.user = action.payload;
    },
    logout: state => {
      state.user = undefined;
    },
  },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
