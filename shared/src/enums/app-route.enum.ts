const AppRoute = {
    ROOT: '/',
    ADMIN_ROOT: '/admin',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    DASHBOARD: '/admin/dashboard',
    ORDERS: '/admin/orders',
    ORDER_$ID: '/admin/orders/:id',
    ORDER_CREATE: '/admin/orders/create',
    PRODUCTS: '/admin/products',
    PRODUCT_$ID: '/admin/products/:id',
    PRODUCT_CREATE: '/admin/products/create',
    ANALYTICS: '/admin/analytics',
    MANAGERS: '/admin/managers',
    SIGN_UP_MANAGER: '/sign-up-manager',
    CONFIRM_EMAIL: '/confirm-email',
    PROFILE: '/admin/profile',
    NOT_FOUND: '*',
} as const;

export { AppRoute };
