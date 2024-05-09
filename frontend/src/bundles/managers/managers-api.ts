import { ApiPath } from '~/bundles/common/enums/enums.js';
import { type PagedResponse } from '~/bundles/common/types/types.js';
import {
    type RegistrationUrlResponseDto,
    type UserResponseDto,
} from '~/bundles/users/types/types.js';
import { baseApi } from '~/framework/base-api/base-api.js';

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
        getManagers: build.query<PagedResponse<UserResponseDto>, number>({
            query: (page = 1) => `${ApiPath.MANAGERS}?page=${page}&limit=4`,
        }),
    }),
});

const { useCreateRegistrationUrlMutation, useGetManagersQuery } = managersApi;

export { managersApi, useCreateRegistrationUrlMutation, useGetManagersQuery };
