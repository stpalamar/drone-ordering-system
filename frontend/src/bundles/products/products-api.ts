import { ApiPath, AppSubject } from '~/bundles/common/enums/enums.js';
import { type PagedResponse } from '~/bundles/common/types/types.js';
import { baseApi } from '~/framework/base-api/base-api.js';

import {
    type ProductQueryDto,
    type ProductRequestDto,
    type ProductResponseDto,
    type ProductTypesDto,
} from './types/types.js';

const productsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<
            PagedResponse<ProductResponseDto>,
            ProductQueryDto
        >({
            query: ({ page, limit, dateSort, isActive, totalSalesSort }) =>
                `${ApiPath.PRODUCTS}?page=${page}&limit=${limit}&dateSort=${dateSort}&isActive=${isActive}&totalSalesSort=${totalSalesSort}`,
            providesTags: [AppSubject.Product],
        }),
        getProductById: build.query<ProductResponseDto, number>({
            query: (id) => `${ApiPath.PRODUCTS}/${id}`,
            providesTags: [AppSubject.Product],
        }),
        getProductTypes: build.query<ProductTypesDto, void>({
            query: () => `${ApiPath.PRODUCTS}/types`,
            providesTags: [AppSubject.Product],
        }),
        createProduct: build.mutation<ProductResponseDto, ProductRequestDto>({
            query: (payload) => ({
                url: ApiPath.PRODUCTS,
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: [AppSubject.Product],
        }),
        updateProduct: build.mutation<
            ProductResponseDto,
            { id: number; item: ProductRequestDto }
        >({
            query: (payload) => ({
                url: `${ApiPath.PRODUCTS}/${payload.id}`,
                method: 'PUT',
                body: payload.item,
            }),
            invalidatesTags: [AppSubject.Product],
        }),
        deleteProduct: build.mutation<void, number>({
            query: (id) => ({
                url: `${ApiPath.PRODUCTS}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [AppSubject.Product],
        }),
    }),
});

const {
    useCreateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useGetProductsQuery,
    useGetProductTypesQuery,
    useUpdateProductMutation,
} = productsApi;

export {
    productsApi,
    useCreateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useGetProductsQuery,
    useGetProductTypesQuery,
    useUpdateProductMutation,
};
