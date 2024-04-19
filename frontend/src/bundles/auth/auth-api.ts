import {
    type UserDto,
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/bundles/users/users.js';
import { baseApi } from '~/framework/base-api/base-api.package.js';

const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        signIn: build.mutation<UserDto, UserSignInRequestDto>({
            query: (payload) => ({
                url: '/auth/sign-in',
                method: 'POST',
                body: payload,
            }),
        }),
        signUp: build.mutation<UserDto, UserSignUpRequestDto>({
            query: (payload) => ({
                url: '/auth/sign-up',
                method: 'POST',
                body: payload,
            }),
        }),
        getMe: build.query<UserDto, void>({
            query: () => '/auth/me',
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
    }),
});

const {
    useSignInMutation,
    useSignUpMutation,
    useGetMeQuery,
    useLogoutMutation,
} = authApi;

export {
    authApi,
    useGetMeQuery,
    useLogoutMutation,
    useSignInMutation,
    useSignUpMutation,
};
