import { isRejected, type Middleware } from '@reduxjs/toolkit';
import { toast } from 'sonner';

const errorMiddleware: Middleware = () => {
    return (next) => (action) => {
        if (isRejected(action)) {
            const { data } = action.payload as { data: { message: string } };
            if (data) {
                toast.error(data.message);
            } else {
                toast.error('Something went wrong');
            }
        }
        next(action);
    };
};

export { errorMiddleware };
