import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../api/userApi";
import { ACCESS_TOKEN } from "../constants/constants";

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
    discordData: [],
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
    logout: (state) => {
      localStorage.removeItem(ACCESS_TOKEN);
      state.user = { ...initialState };
      state.user.isInitialized = true;
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

export const logout = () => async (dispatch) => {
  dispatch(slice.actions.logout());
};

export default slice;
