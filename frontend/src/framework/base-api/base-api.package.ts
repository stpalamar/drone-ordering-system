import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { config } from '../config/config.js';

const baseApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: config.ENV.API.ORIGIN_URL }),
    endpoints: () => ({}),
});

export { baseApi };
