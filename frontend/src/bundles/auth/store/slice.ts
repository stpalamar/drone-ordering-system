import { createSlice } from '@reduxjs/toolkit';

import { type UserResponseDto } from '~/bundles/users/users.js';

import { authApi } from '../auth-api.js';

type State = {
    user: UserResponseDto | null;
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
        builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
            state.user = null;
        });
    },
});

export { actions, name, reducer, type State };
