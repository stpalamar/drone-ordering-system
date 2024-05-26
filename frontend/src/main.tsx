import '~/assets/css/styles.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '~/app/app.js';
import { Auth } from '~/bundles/auth/auth.js';
import {
    AbilityContext,
    BaseAdminLayout,
    BaseUserLayout,
    NotificationContainer,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components.js';
import {
    AppRoute,
    PermissionAction,
    PermissionSubject,
} from '~/bundles/common/enums/enums.js';
import { CreateOrder } from '~/bundles/orders/pages/create-order.js';
import { Orders } from '~/bundles/orders/pages/orders.js';

import { Analytics } from './bundles/analytics/pages/analytics.js';
import { ConfirmEmail } from './bundles/auth/pages/confirm-email.js';
import { ManagerSignUp } from './bundles/auth/pages/manager-sign-up.js';
import { NotFound } from './bundles/common/pages/pages.js';
import { CustomerOrder } from './bundles/customers/pages/customer-order.js';
import { Drones } from './bundles/customers/pages/drones.js';
import { MakeOrder } from './bundles/customers/pages/make-order.js';
import { MyOrders } from './bundles/customers/pages/my-orders.js';
import { Landing } from './bundles/landing/pages/landing.js';
import { Managers } from './bundles/managers/pages/managers.js';
import { Order } from './bundles/orders/pages/order.js';
import { CreateProduct } from './bundles/products/pages/create-product.js';
import { Product } from './bundles/products/pages/product.js';
import { Products } from './bundles/products/pages/products.js';
import { ProfileSettings } from './bundles/profile/pages/profile-settings.js';
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
                path: AppRoute.SIGN_UP_MANAGER,
                element: <ManagerSignUp />,
            },
            {
                path: AppRoute.CONFIRM_EMAIL,
                element: <ConfirmEmail />,
            },
            {
                path: AppRoute.ROOT,
                element: <BaseUserLayout />,
                children: [
                    {
                        path: AppRoute.ROOT,
                        element: <Landing />,
                    },
                    {
                        path: AppRoute.MY_ORDERS,
                        element: <MyOrders />,
                        isPrivate: true,
                    },
                    {
                        path: AppRoute.MY_ORDER_CREATE,
                        element: <MakeOrder />,
                        isPrivate: true,
                    },
                    {
                        path: AppRoute.MY_ORDER_$ID,
                        element: <CustomerOrder />,
                        isPrivate: true,
                    },
                    {
                        path: AppRoute.PROFILE,
                        element: <ProfileSettings />,
                        isPrivate: true,
                    },
                    {
                        path: AppRoute.DRONES,
                        element: <Drones />,
                        isPrivate: true,
                    },
                ],
            },
            {
                path: AppRoute.ADMIN_ROOT,
                element: <BaseAdminLayout />,
                isPrivate: true,
                children: [
                    {
                        path: AppRoute.ADMIN_DASHBOARD,
                        element: <div>Dashboard</div>,
                    },
                    {
                        path: AppRoute.ADMIN_ORDERS,
                        element: <Orders />,
                    },
                    {
                        path: AppRoute.ADMIN_ORDER_$ID,
                        element: <Order />,
                    },
                    {
                        path: AppRoute.ADMIN_ORDER_CREATE,
                        element: <CreateOrder />,
                    },
                    {
                        path: AppRoute.ADMIN_PRODUCTS,
                        element: <Products />,
                    },
                    {
                        path: AppRoute.ADMIN_PRODUCT_CREATE,
                        element: <CreateProduct />,
                    },
                    {
                        path: AppRoute.ADMIN_PRODUCT_$ID,
                        element: <Product />,
                    },
                    {
                        path: AppRoute.ADMIN_ANALYTICS,
                        element: <Analytics />,
                    },
                    {
                        path: AppRoute.ADMIN_PROFILE,
                        element: <ProfileSettings />,
                    },
                    {
                        path: AppRoute.ADMIN_MANAGERS,
                        element: <Managers />,
                        isPrivate: true,
                        permissions: [
                            {
                                subject: PermissionSubject.USER,
                                action: PermissionAction.MANAGE,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: AppRoute.NOT_FOUND,
        element: <NotFound />,
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
