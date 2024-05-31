import { Loader } from '~/bundles/common/components/components.js';
import { Period } from '~/bundles/common/enums/enums.js';

import { useGetAnalyticsQuery } from '../analytics-api.js';
import {
    NewUsersCard,
    RevenueCard,
    TopManagerCard,
    TopProductCard,
} from '../components/components.js';

const Analytics: React.FC = () => {
    const { data: analytics, isLoading } = useGetAnalyticsQuery();

    if (isLoading || !analytics) {
        return <Loader size="large" isOverflow />;
    }

    const { topManager, newUsers, revenue, topThreeProducts } = analytics;

    return (
        <main className="flex flex-1 flex-col gap-4 px-4 lg:gap-6 lg:px-6">
            <div className="grid gap-4 md:gap-8">
                <div>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
                        Revenue
                    </h4>
                    <div className="grid gap-4 grid-flow-row md:grid-flow-col">
                        <RevenueCard
                            revenue={revenue.week}
                            period={Period.WEEK}
                        />
                        <RevenueCard
                            revenue={revenue.month}
                            period={Period.MONTH}
                        />
                        <RevenueCard
                            revenue={revenue.year}
                            period={Period.YEAR}
                        />
                    </div>
                </div>
                <div>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
                        New users
                    </h4>
                    <div className="grid gap-4 grid-flow-row md:grid-flow-col">
                        <NewUsersCard
                            newUsers={newUsers.week}
                            period={Period.WEEK}
                        />
                        <NewUsersCard
                            newUsers={newUsers.month}
                            period={Period.MONTH}
                        />
                        <NewUsersCard
                            newUsers={newUsers.year}
                            period={Period.YEAR}
                        />
                    </div>
                </div>
                <div>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
                        Top managers
                    </h4>
                    <div className="grid gap-4 grid-flow-row md:grid-flow-col">
                        <TopManagerCard
                            topManager={topManager.week ?? null}
                            period={Period.WEEK}
                        />
                        <TopManagerCard
                            topManager={topManager.month ?? null}
                            period={Period.MONTH}
                        />
                        <TopManagerCard
                            topManager={topManager.year ?? null}
                            period={Period.YEAR}
                        />
                    </div>
                </div>
            </div>
            <div>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
                    Top three products
                </h4>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center">
                    {topThreeProducts.map((product) => (
                        <TopProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export { Analytics };
