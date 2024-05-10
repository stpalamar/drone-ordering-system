import { format } from 'date-fns';

const formatDateWithMonth = (date: Date): string => {
    return format(date, 'MMMM d, yyyy');
};

export { formatDateWithMonth };
