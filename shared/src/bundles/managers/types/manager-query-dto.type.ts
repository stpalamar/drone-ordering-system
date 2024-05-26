import { type PaginationQueryDto } from '../../../types/types.js';

type ManagerQueryDto = PaginationQueryDto & {
    isActive: boolean | null;
};

export { type ManagerQueryDto };
