import { type Period } from '../../../enums/enums.js';
import { type PaginationQueryDto, type ValueOf } from '../../../types/types.js';
import { type AssignedType, type OrderStatus } from '../enums/enums.js';

type OrderQueryDto = PaginationQueryDto & {
    status: ValueOf<typeof OrderStatus>[] | null;
    period: ValueOf<typeof Period>;
    assigned: ValueOf<typeof AssignedType> | null;
};

export { type OrderQueryDto };
