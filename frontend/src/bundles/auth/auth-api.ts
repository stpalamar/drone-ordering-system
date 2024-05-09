import { type ManagerSignUpRequestDto } from '~/bundles/managers/types/types.js';
import {
    type UserConfirmEmailRequestDto,
    type UserResponseDto,
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/bundles/users/users.js';
import { baseApi } from '~/framework/base-api/base-api.package.js';

const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        signIn: build.mutation<UserResponseDto, UserSignInRequestDto>({
            query: (payload) => ({
                url: '/auth/sign-in',
                method: 'POST',
                body: payload,
            }),
        }),
        signUp: build.mutation<UserResponseDto, UserSignUpRequestDto>({
            query: (payload) => ({
                url: '/auth/sign-up',
                method: 'POST',
                body: payload,
            }),
        }),
        signUpManager: build.mutation<void, ManagerSignUpRequestDto>({
            query: (payload) => ({
                url: '/auth/sign-up-manager',
                method: 'POST',
                body: payload,
            }),
        }),
        confirmEmail: build.mutation<
            UserResponseDto,
            UserConfirmEmailRequestDto
        >({
            query: (payload) => ({
                url: '/auth/confirm-email',
                method: 'POST',
                body: payload,
            }),
        }),
        getMe: build.query<UserResponseDto, void>({
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
    useSignUpManagerMutation,
    useConfirmEmailMutation,
    useGetMeQuery,
    useLogoutMutation,
} = authApi;

export {
    authApi,
    useConfirmEmailMutation,
    useGetMeQuery,
    useLogoutMutation,
    useSignInMutation,
    useSignUpManagerMutation,
    useSignUpMutation,
};
