import * as bcrypt from 'bcrypt';
import { format, zonedTimeToUtc } from 'date-fns-tz';

export const HelperService = {
    getTimeInUtc(date: Date | string): Date {
        const thatDate = date instanceof Date ? date : new Date(date);
        const currentUtcTime = zonedTimeToUtc(thatDate, 'UTC');

        return new Date(format(currentUtcTime, 'yyyy-MM-dd HH:mm:ss'));
    },

    encryptSync(userPassword: string): Promise<string> {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(userPassword, salt);
    },

    verifyHash(userPassword: string, hash: string): Promise<boolean> {
        return bcrypt.compareSync(userPassword, hash);
    },
};
