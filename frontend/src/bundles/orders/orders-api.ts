import { ApiPath, AppSubject } from '~/bundles/common/enums/enums.js';
import { type PagedResponse } from '~/bundles/common/types/types.js';
import { baseApi } from '~/framework/base-api/base-api.package.js';

import {
    type OrderQueryDto,
    type OrderRequestDto,
    type OrderResponseDto,
    type OrderStatusDto,
} from './types/types.js';

const ordersApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getOrders: build.query<PagedResponse<OrderResponseDto>, OrderQueryDto>({
            query: ({ page, limit, period, status, assigned }) => {
                const statusQuery = status ? `&status=${status}` : '';
                return `${ApiPath.ORDERS}?page=${page}&limit=${limit}&period=${period}${statusQuery}&assigned=${assigned}`;
            },
            providesTags: [AppSubject.Order],
        }),
        getOrderById: build.query<OrderResponseDto, number>({
            query: (id) => ({
                url: `${ApiPath.ORDERS}/${id}`,
            }),
            providesTags: [AppSubject.Order],
        }),
        updateOrderStatus: build.mutation<
            OrderResponseDto,
            { id: number; status: OrderStatusDto }
        >({
            query: (payload) => ({
                url: `${ApiPath.ORDERS}/update-status/${payload.id}`,
                method: 'PATCH',
                body: payload.status,
            }),
            invalidatesTags: [AppSubject.Order],
        }),
        createOrder: build.mutation<OrderResponseDto, OrderRequestDto>({
            query: (payload) => ({
                url: ApiPath.ORDERS,
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: [AppSubject.Order, AppSubject.Product],
        }),
        updateOrder: build.mutation<
            OrderResponseDto,
            { id: number; item: OrderRequestDto }
        >({
            query: (payload) => ({
                url: `${ApiPath.ORDERS}/${payload.id}`,
                method: 'PUT',
                body: payload.item,
            }),
        }),
        assignOrder: build.mutation<OrderResponseDto, number>({
            query: (id) => ({
                url: `${ApiPath.ORDERS}/assign/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: [AppSubject.Order],
        }),
    }),
});

const {
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useCreateOrderMutation,
    useUpdateOrderStatusMutation,
    useUpdateOrderMutation,
    useAssignOrderMutation,
} = ordersApi;

export {
    useAssignOrderMutation,
    useCreateOrderMutation,
    useGetOrderByIdQuery,
    useGetOrdersQuery,
    useUpdateOrderMutation,
    useUpdateOrderStatusMutation,
};
