import { type SortQuery } from '../../../enums/enums.js';
import { type PaginationQueryDto, type ValueOf } from '../../../types/types.js';

type ProductQueryDto = PaginationQueryDto & {
    isActive: boolean | null;
    dateSort: ValueOf<typeof SortQuery>;
    totalSalesSort: ValueOf<typeof SortQuery>;
};

export { type ProductQueryDto };
