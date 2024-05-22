import { ValueOf } from '@common/types/types';
import {
    Entity,
    Enum,
    ManyToOne,
    PrimaryKey,
    Property,
} from '@mikro-orm/postgresql';
import { User } from '@modules/users/entities/user.entity';

import { PermissionAction } from '../enums/enums';
import { PermissionCondition } from '../types/types';
import { Subject } from './subject.entity';

@Entity()
class Permission {
    @PrimaryKey({ index: true })
    id!: number;

    @Enum({
        items: () => PermissionAction,
        nativeEnumName: 'action',
    })
    action: ValueOf<typeof PermissionAction>;

    @ManyToOne()
    subject: Subject;

    @Property({ type: 'jsonb', nullable: true })
    condition: Record<string, any> | null;

    public static parseCondition(
        condition: PermissionCondition,
        variables: User,
    ): PermissionCondition {
        if (!condition) return null;
        const parsedCondition = {};
        for (const [key, rawValue] of Object.entries(condition)) {
            if (rawValue !== null && typeof rawValue === 'object') {
                const value = this.parseCondition(rawValue, variables);
                parsedCondition[key] = value;
                continue;
            }
            if (typeof rawValue !== 'string') {
                parsedCondition[key] = rawValue;
                continue;
            }
            // find placeholder "${}""
            const matches = /^\${([a-zA-Z0-9]+)}$/.exec(rawValue);
            if (!matches) {
                parsedCondition[key] = rawValue;
                continue;
            }

            const value = variables[matches[1]];
            if (typeof value === 'undefined') {
                throw new ReferenceError(`Variable ${name} is not defined`);
            }
            parsedCondition[key] = value;
        }
        return parsedCondition;
    }
}

export { Permission };
