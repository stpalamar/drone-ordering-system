import { createSlice } from '@reduxjs/toolkit';

import { type UserDto } from '~/bundles/users/users.js';

import { authApi } from '../auth-api.js';

type State = {
    user: UserDto | null;
};

const initialState: State = {
    user: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(
            authApi.endpoints.signIn.matchFulfilled,
            (state, { payload }) => {
                state.user = payload;
            },
        );
        builder.addMatcher(
            authApi.endpoints.signUp.matchFulfilled,
            (state, { payload }) => {
                state.user = payload;
            },
        );
        builder.addMatcher(
            authApi.endpoints.getMe.matchFulfilled,
            (state, { payload }) => {
                state.user = payload;
            },
        );
    },
});

export { actions, name, reducer, type State };
