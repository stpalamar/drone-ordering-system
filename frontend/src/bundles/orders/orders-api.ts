import { ApiPath, AppSubject } from '~/bundles/common/enums/enums.js';
import { type PagedResponse } from '~/bundles/common/types/types.js';
import { baseApi } from '~/framework/base-api/base-api.package.js';

import {
    type OrderQueryDto,
    type OrderRequestDto,
    type OrderResponseDto,
} from './types/types.js';

const ordersApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getOrders: build.query<PagedResponse<OrderResponseDto>, OrderQueryDto>({
            query: ({ page, limit, period, status }) => {
                return `${ApiPath.ORDERS}?page=${page}&limit=${limit}&period=${period}&status=${status}`;
            },
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
