import { DollarSign } from 'lucide-react';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '~/bundles/common/components/ui/card.js';
import { type Period } from '~/bundles/common/enums/enums.js';
import {
    capitalizeFirstLetter,
    formatPrice,
} from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type RevenueForPeriod } from '../../types/types.js';

type Properties = {
    revenue: RevenueForPeriod;
    period: ValueOf<typeof Period>;
};

const RevenueCard: React.FC<Properties> = ({ revenue, period }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    This {capitalizeFirstLetter(period)} revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {formatPrice(revenue.revenue)}
                </div>
                <p className="text-xs text-muted-foreground">
                    {revenue.increaseFromLastPeriod}% from last month
                </p>
            </CardContent>
        </Card>
    );
};

export { RevenueCard };
