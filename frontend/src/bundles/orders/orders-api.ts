import { ApiPath, AppSubject } from '~/bundles/common/enums/enums.js';
import { type PagedResponse } from '~/bundles/common/types/types.js';
import { baseApi } from '~/framework/base-api/base-api.package.js';

import { type OrderRequestDto, type OrderResponseDto } from './types/types.js';

const ordersApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getOrders: build.query<PagedResponse<OrderResponseDto>, number | void>({
            query: (page = 1) => `${ApiPath.ORDERS}?page=${page}&limit=10`,
            providesTags: [AppSubject.Order],
        }),
        getOrderById: build.query<OrderResponseDto, number>({
            query: (id) => ({
                url: `${ApiPath.ORDERS}/${id}`,
            }),
            providesTags: [AppSubject.Order],
        }),
        createOrder: build.mutation<OrderResponseDto, OrderRequestDto>({
            query: (payload) => ({
                url: ApiPath.ORDERS,
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: [AppSubject.Order],
        }),
    }),
});

const { useGetOrdersQuery, useGetOrderByIdQuery, useCreateOrderMutation } =
    ordersApi;

export { useCreateOrderMutation, useGetOrderByIdQuery, useGetOrdersQuery };
