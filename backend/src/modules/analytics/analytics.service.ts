import { Period } from '@common/enums/enums';
import { ValueOf } from '@common/types/types';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { OrderStatus } from '@modules/orders/enums/enums';
import { Role } from '@modules/permission/entities/role.entity';
import { Product } from '@modules/products/entities/product.entity';
import { User } from '@modules/users/entities/user.entity';
import { UserRole } from '@modules/users/enums/enums';
import { Injectable } from '@nestjs/common';
import {
    startOfDay,
    startOfMonth,
    startOfWeek,
    startOfYear,
    subDays,
    subMonths,
    subWeeks,
    subYears,
} from 'date-fns';

import {
    DashboardResponseDto,
    RevenueForPeriod,
    RevenueResponseDto,
    TopManagerForPeriod,
} from './types/types';

@Injectable()
export class AnalyticsService {
    constructor(
        private readonly em: EntityManager,
        @InjectRepository(Product)
        private readonly productRepository: EntityRepository<Product>,
        @InjectRepository(User)
        private readonly userRepository: EntityRepository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: EntityRepository<Role>,
    ) {}

    async getTodayDashboard(): Promise<DashboardResponseDto> {
        const revenueForToday = await this.getRevenueForPeriod(Period.DAY);
        const newUsers = await this.getNewUsersForPeriod(Period.DAY);

        return {
            todayRevenue: revenueForToday,
            newUsers,
        };
    }

    async getFullAnalytics() {
        const topThreeProducts = await this.getTopThreeProducts();
        return {
            topThreeProducts,
            revenue: await this.getRevenue(),
            topManager: await this.getTopManager(),
            newUsers: await this.getNewUsers(),
        };
    }

    async getRevenue(): Promise<RevenueResponseDto> {
        const revenueForWeek = await this.getRevenueForPeriod(Period.WEEK);
        const revenueForMonth = await this.getRevenueForPeriod(Period.MONTH);
        const revenueForYear = await this.getRevenueForPeriod(Period.YEAR);

        return {
            week: revenueForWeek,
            month: revenueForMonth,
            year: revenueForYear,
        };
    }

    async getTopManager(): Promise<TopManagerForPeriod> {
        const topManagerForWeek = await this.getTopManagerForPeriod(
            Period.WEEK,
        );
        const topManagerForMonth = await this.getTopManagerForPeriod(
            Period.MONTH,
        );
        const topManagerForYear = await this.getTopManagerForPeriod(
            Period.YEAR,
        );

        return {
            week: topManagerForWeek,
            month: topManagerForMonth,
            year: topManagerForYear,
        };
    }

    async getNewUsers() {
        const newUsersForWeek = await this.getNewUsersForPeriod(Period.WEEK);
        const newUsersForMonth = await this.getNewUsersForPeriod(Period.MONTH);
        const newUsersForYear = await this.getNewUsersForPeriod(Period.YEAR);

        return {
            week: newUsersForWeek,
            month: newUsersForMonth,
            year: newUsersForYear,
        };
    }

    private async getRevenueForPeriod(
        period: ValueOf<typeof Period>,
    ): Promise<RevenueForPeriod> {
        const { currentPeriod, previousPeriod } = this.getPeriodDates(period);

        const knex = this.em.getKnex();
        const [{ sum: sumString, count: countString }] = await knex('order')
            .where('created_at', '>=', currentPeriod)
            .whereNotIn('status', [OrderStatus.CANCELLED])
            .sum('total_price')
            .count('id')
            .select();

        const [{ sum: previousSumString, count: previousCountString }] =
            await knex('order')
                .whereBetween('created_at', [previousPeriod, currentPeriod])
                .whereNotIn('status', [OrderStatus.CANCELLED])
                .sum('total_price')
                .count('id')
                .select();

        const sum = Number(sumString);
        const count = Number(countString);
        const previousSum = Number(previousSumString);
        const previousCount = Number(previousCountString);

        const increaseRevenuePercentage = previousSum
            ? ((sum - previousSum) / previousSum) * 100
            : 100;

        const increaseCountPercentage = previousCount
            ? ((count - previousCount) / previousCount) * 100
            : 100;

        return {
            revenue: sum,
            amountOfOrders: count,
            increaseAmountPercentage: parseFloat(
                increaseCountPercentage.toFixed(2),
            ),
            increaseRevenuePercentage: parseFloat(
                increaseRevenuePercentage.toFixed(2),
            ),
        };
    }

    private async getTopThreeProducts() {
        const products = await this.productRepository.find(
            {},
            {
                orderBy: { totalSales: 'desc' },
                limit: 3,
                populate: ['image', 'price'],
            },
        );

        return products.map((product) => product.toObject());
    }

    private async getTopManagerForPeriod(period: ValueOf<typeof Period>) {
        const { currentPeriod } = this.getPeriodDates(period);

        const knex = this.em.getKnex();
        const topManager = await knex('order')
            .select('manager_id')
            .where('created_at', '>=', currentPeriod)
            .count('manager_id as count')
            .groupBy('manager_id')
            .orderBy('count', 'desc')
            .limit(1);

        const manager = await this.userRepository.findOne(
            topManager[0].manager_id,
            {
                populate: [
                    'role',
                    'role.permissions',
                    'role.permissions.subject',
                    'details',
                    'details.avatar',
                ],
            },
        );

        return {
            manager: manager.toObject(),
            amountOfOrders: topManager[0].count,
        };
    }

    private async getNewUsersForPeriod(period: ValueOf<typeof Period>) {
        const { currentPeriod } = this.getPeriodDates(period);

        const role = await this.roleRepository.findOne({ name: UserRole.USER });
        const count = await this.userRepository.count({
            role: role,
            createdAt: { $gte: currentPeriod },
        });

        return count;
    }

    private getPeriodDates(period: ValueOf<typeof Period>): {
        currentPeriod: Date;
        previousPeriod: Date;
    } {
        const today = new Date();
        let currentPeriod = today;
        let previousPeriod = today;

        switch (period) {
            case Period.DAY:
                currentPeriod = startOfDay(today);
                previousPeriod = subDays(currentPeriod, 1);
                break;
            case Period.WEEK:
                currentPeriod = startOfWeek(today, { weekStartsOn: 1 });
                previousPeriod = subWeeks(currentPeriod, 1);
                break;
            case Period.MONTH:
                currentPeriod = startOfMonth(today);
                previousPeriod = subMonths(currentPeriod, 1);
                break;
            case Period.YEAR:
                currentPeriod = startOfYear(today);
                previousPeriod = subYears(currentPeriod, 1);
                break;
        }

        return { currentPeriod, previousPeriod };
    }
}
