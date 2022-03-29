import { createSlice } from '@reduxjs/toolkit';
import { apolloClient } from '../apollo/apolloClient';
import { gql } from '@apollo/client';

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
    login(state, action) {
      state.user = action.payload;
      state.user.isAuthenticated = true;
      state.user.isInitialized = true;
    },
    failedLogin(state) {
      state.user.isInitialized = true;
      state.user.isAuthenticated = false;
    }
  }
});

export const { reducer } = slice;

// actions

export const me = () => async (dispatch) => {
  const userDataQuery = gql`
    query UserDataQuery {
      me {
        id
        osuId
        provider
        roles {
          id
          name
        }
        username
      }
    }
  `;
  await apolloClient.query({ query: userDataQuery })
                    .then((response) => {
                      console.log(response.data.me);
                      dispatch(slice.actions.login(response.data));
                    })
                    .catch((error) => {
                      console.log(error.errors);
                      dispatch(slice.actions.failedLogin());
                    });
};

export default slice;
