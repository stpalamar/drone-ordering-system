import { format } from 'date-fns';

const getISODate = (date: Date): string => {
    return format(date, 'yyyy-MM-dd');
};

export { getISODate };
