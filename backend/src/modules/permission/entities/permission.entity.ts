import { ValueOf } from '@common/types/types';
import {
    Entity,
    Enum,
    ManyToOne,
    PrimaryKey,
    Property,
} from '@mikro-orm/postgresql';

import { PermissionAction } from '../enums/enums';
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

    @Property({ type: 'json', nullable: true })
    condition?: string;
}

export { Permission };
