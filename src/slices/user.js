import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../api/userApi";

const initialState = {
  user: {
    id: null,
    username: null,
    osuId: null,
    avatarUrl: null,
    provider: null,
    roles: [],
    isInitialized: false,
    isAuthenticated: false,
  },
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        user: {
          ...action.payload,
          isAuthenticated: true,
          isInitialized: true,
        },
      };
    },
    failedLogin: (state) => {
      state.user.isInitialized = true;
      state.user.isAuthenticated = false;
    },
  },
});

export const { reducer } = slice;
export const getUser = (state) => state;

// actions

export const me = () => async (dispatch) => {
  try {
    const response = await userApi.me();
    dispatch(slice.actions.login(response.data));
  } catch (error) {
    dispatch(slice.actions.failedLogin());
  }
};

export default slice;
