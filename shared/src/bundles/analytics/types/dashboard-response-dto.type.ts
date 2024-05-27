import { type RevenueForPeriod } from './revenue-for-period.type.js';

type DashboardResponseDto = {
    todayRevenue: RevenueForPeriod;
    newUsers: number;
};

export { type DashboardResponseDto };
