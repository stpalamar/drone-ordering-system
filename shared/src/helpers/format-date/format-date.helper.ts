import { format } from 'date-fns';

const formatDate = (date: Date): string => {
    return format(date, 'dd-MM-yyyy');
};

export { formatDate };
