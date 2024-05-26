import { Activity } from 'lucide-react';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '~/bundles/common/components/ui/card.js';
import { type Period } from '~/bundles/common/enums/enums.js';
import { capitalizeFirstLetter } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type Properties = {
    newUsers: number;
    period: ValueOf<typeof Period>;
};

const NewUsersCard: React.FC<Properties> = ({ newUsers, period }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    This {capitalizeFirstLetter(period)} new users
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+{newUsers}</div>
            </CardContent>
        </Card>
    );
};

export { NewUsersCard };
