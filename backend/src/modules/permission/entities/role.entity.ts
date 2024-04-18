import {
    Collection,
    Entity,
    ManyToMany,
    PrimaryKey,
    Property,
} from '@mikro-orm/postgresql';

import { Permission } from './permission.entity';

@Entity()
class Role {
    @PrimaryKey({ index: true })
    id!: number;

    @Property()
    name: string;

    @ManyToMany(() => Permission)
    permissions: Collection<Permission> = new Collection<Permission>(this);
}

export { Role };
