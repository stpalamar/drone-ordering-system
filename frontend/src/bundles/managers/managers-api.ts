import { ApiPath, AppSubject } from '~/bundles/common/enums/enums.js';
import { type PagedResponse } from '~/bundles/common/types/types.js';
import {
    type RegistrationUrlResponseDto,
    type UserResponseDto,
} from '~/bundles/users/types/types.js';
import { baseApi } from '~/framework/base-api/base-api.js';

import { type ManagerQueryDto } from './types/types.js';

const managersApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createRegistrationUrl: build.mutation<RegistrationUrlResponseDto, void>(
            {
                query: () => ({
                    url: ApiPath.MANAGERS_REGISTRATION_URL,
                    method: 'POST',
                }),
            },
        ),
        getManagers: build.query<
            PagedResponse<UserResponseDto>,
            ManagerQueryDto
        >({
            query: ({ page, limit, isActive }) =>
                `${ApiPath.MANAGERS}?page=${page}&limit=${limit}&isActive=${isActive}`,
            providesTags: [AppSubject.User],
        }),
        deactivateManager: build.mutation<void, number>({
            query: (id) => ({
                url: `${ApiPath.MANAGERS}/${id}/deactivate`,
                method: 'PATCH',
            }),
            invalidatesTags: [AppSubject.User],
        }),
        activateManager: build.mutation<void, number>({
            query: (id) => ({
                url: `${ApiPath.MANAGERS}/${id}/activate`,
                method: 'PATCH',
            }),
            invalidatesTags: [AppSubject.User],
        }),
    }),
});

const {
    useCreateRegistrationUrlMutation,
    useGetManagersQuery,
    useDeactivateManagerMutation,
    useActivateManagerMutation,
} = managersApi;

export {
    managersApi,
    useActivateManagerMutation,
    useCreateRegistrationUrlMutation,
    useDeactivateManagerMutation,
    useGetManagersQuery,
};
