import { Request as OriginalRequest } from 'express';
import { User } from '@modules/users/entities/user.entity';

declare module 'express' {
    interface Request extends OriginalRequest {
        user: User;
    }
}
