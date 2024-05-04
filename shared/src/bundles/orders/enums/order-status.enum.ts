const OrderStatus = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    IN_PROGRESS: 'in_progress',
    READY: 'ready',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
} as const;

export { OrderStatus };
