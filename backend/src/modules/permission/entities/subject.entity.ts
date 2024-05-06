import { ValueOf } from '@common/types/types';
import { Entity, PrimaryKey, Property } from '@mikro-orm/postgresql';

import { PermissionSubject } from '../enums/enums';

@Entity()
class Subject {
    @PrimaryKey({ index: true })
    id!: number;

    @Property({ unique: true })
    name: ValueOf<typeof PermissionSubject>;
}

export { Subject };
