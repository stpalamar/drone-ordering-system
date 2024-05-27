import { ApiPath } from '~/bundles/common/enums/enums.js';
import { baseApi } from '~/framework/base-api/base-api.js';

import {
    type AnalyticsResponseDto,
    type DashboardResponseDto,
    type RevenueResponseDto,
} from './types/types.js';

const analyticsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getRevenue: build.query<RevenueResponseDto, void>({
            query: () => `${ApiPath.ANALYTICS}/revenue`,
        }),
        getAnalytics: build.query<AnalyticsResponseDto, void>({
            query: () => `${ApiPath.ANALYTICS}`,
        }),
        getTodayDashboard: build.query<DashboardResponseDto, void>({
            query: () => `${ApiPath.ANALYTICS}/today`,
        }),
    }),
});

const { useGetRevenueQuery, useGetAnalyticsQuery, useGetTodayDashboardQuery } =
    analyticsApi;

export {
    analyticsApi,
    useGetAnalyticsQuery,
    useGetRevenueQuery,
    useGetTodayDashboardQuery,
};
