import { createSlice } from '@reduxjs/toolkit';
import { apolloClient } from '../apollo/apolloClient';
import { userDataQuery } from '../ql/UserQueries';

const initialState = {
  user: {
    id: null,
    username: null,
    osuId: null,
    avatarUrl: null,
    provider: null,
    roles: [],
    isInitialized: false,
    isAuthenticated: false
  }
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        user: {
          ...action.payload,
          isAuthenticated: true,
          isInitialized: true
        }
      };
    },
    failedLogin: (state) => {
      state.user.isInitialized = true;
      state.user.isAuthenticated = false;
    }
  }
});

export const { reducer } = slice;
export const getUser = state => state;

// actions

export const me = () => async (dispatch) => {
  try {
    let user = await apolloClient.query({ query: userDataQuery });
    dispatch(slice.actions.login(user.data.me));
  } catch (e) {
    dispatch(slice.actions.failedLogin());
  }
};

export default slice;
