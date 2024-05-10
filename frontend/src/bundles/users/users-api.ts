import { ApiPath } from '~/bundles/common/enums/enums.js';
import { baseApi } from '~/framework/base-api/base-api.js';

import { type UserDetailsDto, type UserResponseDto } from './types/types.js';

const usersApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        updateUser: build.mutation<
            UserResponseDto,
            { id: number; item: UserDetailsDto }
        >({
            query: (payload) => ({
                url: `${ApiPath.USERS}/${payload.id}`,
                method: 'PATCH',
                body: payload.item,
            }),
        }),
    }),
});

const { useUpdateUserMutation } = usersApi;

export { usersApi, useUpdateUserMutation };
