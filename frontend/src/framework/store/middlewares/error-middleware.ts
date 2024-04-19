import { isRejected, type Middleware } from '@reduxjs/toolkit';
import { toast } from 'sonner';

const errorMiddleware: Middleware = () => {
    return (next) => (action) => {
        if (isRejected(action)) {
            const { data } = action.payload as { data: { message: string } };
            toast.error(data.message);
        }
        next(action);
    };
};

export { errorMiddleware };
