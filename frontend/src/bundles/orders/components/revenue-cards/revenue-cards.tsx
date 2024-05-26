import { useGetRevenueQuery } from '~/bundles/analytics/analytics-api.js';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/bundles/common/components/ui/card.js';
import { Progress } from '~/bundles/common/components/ui/progress.js';
import { Skeleton } from '~/bundles/common/components/ui/skeleton.js';
import { formatPrice } from '~/bundles/common/helpers/helpers.js';

const RevenueCards: React.FC = () => {
    const { data: revenue, isLoading } = useGetRevenueQuery();

    const skeletonCard = (
        <Card>
            <CardHeader className="pb-2">
                <CardDescription>
                    <Skeleton className="w-20 h-5" />
                </CardDescription>
                <CardTitle className="text-4xl">
                    <Skeleton className="w-32 h-10" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Skeleton className="w-32 h-4" />
            </CardContent>
            <CardFooter>
                <Skeleton className="w-full h-4" />
            </CardFooter>
        </Card>
    );

    if (isLoading || !revenue) {
        return (
            <>
                {skeletonCard}
                {skeletonCard}
            </>
        );
    }

    return (
        <>
            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>This Week</CardDescription>
                    <CardTitle className="text-4xl">
                        {formatPrice(revenue.week.revenue)}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">
                        +{revenue.week.increaseFromLastPeriod}% from last week
                    </div>
                </CardContent>
                <CardFooter>
                    <Progress
                        value={revenue.week.increaseFromLastPeriod}
                        aria-label={`${revenue.week.increaseFromLastPeriod}% increase`}
                    />
                </CardFooter>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>This Month</CardDescription>
                    <CardTitle className="text-4xl">
                        {formatPrice(revenue.month.revenue)}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">
                        +{revenue.month.increaseFromLastPeriod}% from last month
                    </div>
                </CardContent>
                <CardFooter>
                    <Progress
                        value={revenue.month.increaseFromLastPeriod}
                        aria-label={`${revenue.month.increaseFromLastPeriod}% increase`}
                    />
                </CardFooter>
            </Card>
        </>
    );
};

export { RevenueCards };
