import { Period } from '@common/enums/enums';
import { ValueOf } from '@common/types/types';
import { subMonths, subWeeks, subYears } from 'date-fns';

const getPeriodDate = (period: ValueOf<typeof Period>): Date | null => {
    switch (period) {
        case Period.WEEK:
            return subWeeks(new Date(), 1);
        case Period.MONTH:
            return subMonths(new Date(), 1);
        case Period.YEAR:
            return subYears(new Date(), 1);
        default:
            return null;
    }
};

export { getPeriodDate };
