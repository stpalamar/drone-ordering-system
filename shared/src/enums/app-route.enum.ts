const AppRoute = {
    ROOT: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    DASHBOARD: '/dashboard',
    ORDERS: '/orders',
    ORDERS_CREATE: '/orders/create',
    PRODUCTS: '/products',
    ANALYTICS: '/analytics',
    MANAGERS: '/managers',
    SIGN_UP_MANAGER: '/sign-up-manager',
    CONFIRM_EMAIL: '/confirm-email',
} as const;

export { AppRoute };
