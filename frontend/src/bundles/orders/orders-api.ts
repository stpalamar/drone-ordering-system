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
            providesTags: [AppSubject.ORDER],
        }),
        getOrderById: build.query<OrderResponseDto, number>({
            query: (id) => ({
                url: `${ApiPath.ORDERS}/${id}`,
            }),
            providesTags: [AppSubject.ORDER],
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
            invalidatesTags: [AppSubject.ORDER],
        }),
        createOrder: build.mutation<OrderResponseDto, OrderRequestDto>({
            query: (payload) => ({
                url: ApiPath.ORDERS,
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: [AppSubject.ORDER, AppSubject.PRODUCT],
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
            invalidatesTags: [AppSubject.ORDER],
        }),
        generateOrderPdf: build.mutation<null, number>({
            query: (id) => ({
                url: `${ApiPath.ORDERS}/generate-pdf/${id}`,
                method: 'GET',
                responseType: 'blob',
                cache: 'no-cache',
                responseHandler: async (response): Promise<null> => {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    const filename = response.headers
                        .get('Content-Disposition')
                        ?.split('filename=')[1];
                    a.download = filename || 'order.pdf';
                    a.click();
                    window.URL.revokeObjectURL(url);
                    return null;
                },
            }),
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
    useGenerateOrderPdfMutation,
} = ordersApi;

export {
    useAssignOrderMutation,
    useCreateOrderMutation,
    useGenerateOrderPdfMutation,
    useGetOrderByIdQuery,
    useGetOrdersQuery,
    useUpdateOrderMutation,
    useUpdateOrderStatusMutation,
};
