import { type ProductResponseDto } from '../../products/products.js';
import { type NewUsersForPeriod } from './new-users-for-period.type.js';
import { type RevenueResponseDto } from './revenue-response-dto.type.js';
import { type TopManagerForPeriod } from './top-manager-for-period.type.js';

type AnalyticsResponseDto = {
    topThreeProducts: ProductResponseDto[];
    revenue: RevenueResponseDto;
    topManager: TopManagerForPeriod;
    newUsers: NewUsersForPeriod;
};

export { type AnalyticsResponseDto };
