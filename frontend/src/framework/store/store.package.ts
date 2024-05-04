import {
    type ThunkMiddleware,
    Tuple,
    type UnknownAction,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { reducer as authReducer } from '~/bundles/auth/store/auth.js';
import { AppEnvironment } from '~/bundles/common/enums/enums.js';
import { baseApi } from '~/framework/base-api/base-api.js';
import { type Config } from '~/framework/config/config.js';

import { errorMiddleware } from './middlewares/middlewares.js';

type RootReducer = {
    auth: ReturnType<typeof authReducer>;
};

class Store {
    public instance: ReturnType<
        typeof configureStore<
            RootReducer,
            UnknownAction,
            Tuple<[ThunkMiddleware<RootReducer, UnknownAction>]>
        >
    >;

    public constructor(config: Config) {
        this.instance = configureStore({
            devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
            reducer: {
                auth: authReducer,
                [baseApi.reducerPath]: baseApi.reducer,
            },
            middleware: (getDefaultMiddleware) =>
                new Tuple(
                    ...getDefaultMiddleware(),
                    baseApi.middleware,
                    errorMiddleware,
                ),
        });
    }
}

export { Store };
