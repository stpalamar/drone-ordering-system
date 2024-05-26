import { type RevenueForPeriod } from './types.js';

type RevenueResponseDto = {
    week: RevenueForPeriod;
    month: RevenueForPeriod;
    year: RevenueForPeriod;
};

export { type RevenueResponseDto };
