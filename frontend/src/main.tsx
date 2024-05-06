import '~/assets/css/styles.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '~/app/app.js';
import { Auth } from '~/bundles/auth/auth.js';
import {
    AbilityContext,
    BaseLayout,
    NotificationContainer,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { CreateOrder } from '~/bundles/orders/pages/create-order.js';
import { Orders } from '~/bundles/orders/pages/orders.js';

import { Products } from './bundles/products/pages/products.js';
import { ability } from './framework/casl/casl.package.js';
import { store } from './framework/store/store.js';

const routes = [
    {
        path: AppRoute.ROOT,
        element: <App />,
        children: [
            {
                path: AppRoute.SIGN_IN,
                element: <Auth />,
            },
            {
                path: AppRoute.SIGN_UP,
                element: <Auth />,
            },
            {
                path: AppRoute.ROOT,
                element: <BaseLayout />,
                isPrivate: true,
                children: [
                    {
                        path: AppRoute.DASHBOARD,
                        element: <div>Dashboard</div>,
                    },
                    {
                        path: AppRoute.ORDERS,
                        element: <Orders />,
                    },
                    {
                        path: AppRoute.ORDERS_CREATE,
                        element: <CreateOrder />,
                    },
                    {
                        path: AppRoute.PRODUCTS,
                        element: <Products />,
                    },
                    {
                        path: AppRoute.ANALYTICS,
                        element: <div>Analytics</div>,
                    },
                    {
                        path: AppRoute.MANAGERS,
                        element: <div>Managers</div>,
                    },
                ],
            },
        ],
    },
];

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
        <StoreProvider store={store.instance}>
            <AbilityContext.Provider value={ability}>
                <RouterProvider routes={routes} />
                <NotificationContainer />
            </AbilityContext.Provider>
        </StoreProvider>
    </StrictMode>,
);
