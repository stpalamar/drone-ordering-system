import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { AppSubject } from '~/bundles/common/enums/enums.js';

import { config } from '../config/config.js';

const baseApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: config.ENV.API.ORIGIN_URL }),
    tagTypes: [
        AppSubject.PRODUCT,
        AppSubject.ORDER,
        AppSubject.USER,
        AppSubject.ANALYTICS,
    ],
    endpoints: () => ({}),
});

export { baseApi };
