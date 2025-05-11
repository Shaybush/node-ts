import { createSlice } from '@reduxjs/toolkit';
import { UserState } from './types';
import { slicesName } from '@src/store/slicesNames';

const initialState: UserState = {
  isLogged: false,
  isLoading: false,
  data: null,
};

const userSlice = createSlice({
  name: slicesName.USER,
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { user, isLogged } = action.payload;
      state.isLogged = isLogged;
      state.data = user;
    },
    showLoginSpinner: (state) => {
      // debugger;
      state.isLoading = true;
    },
    hideLoginSpinner: (state) => {
      state.isLoading = false;
    },
  },
});

export const { updateUser, showLoginSpinner, hideLoginSpinner } = userSlice.actions;
export const userReducer = userSlice.reducer;
