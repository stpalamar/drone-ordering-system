import { BaseEntity } from '@common/database/base.entity';
import { HelperService } from '@common/helpers/helpers';
import {
    BeforeCreate,
    BeforeUpdate,
    BeforeUpsert,
    Entity,
    EventArgs,
    ManyToOne,
    OneToOne,
    Property,
} from '@mikro-orm/postgresql';
import { Role } from '@modules/permission/entities/role.entity';

import { UserDetails } from './user-details.entity';

@Entity()
class User extends BaseEntity {
    @Property({ unique: true })
    email!: string;

    @Property()
    password!: string;

    @ManyToOne()
    role!: Role;

    @OneToOne({
        entity: () => UserDetails,
        orphanRemoval: true,
        nullable: true,
    })
    details!: UserDetails | null;

    @Property({ default: false })
    isEmailConfirmed!: boolean;

    @BeforeCreate()
    @BeforeUpdate()
    @BeforeUpsert()
    async hashPassword(arguments_: EventArgs<this>) {
        if (arguments_.changeSet?.payload?.password)
            this.password = await HelperService.encryptSync(this.password);
    }

    toObject() {
        return {
            id: this.id,
            email: this.email,
            role: this.role.name,
            permissions: this.role.permissions.getItems().map((permission) => ({
                ...permission,
                subject: permission.subject.name,
            })),
            details: this.details ? this.details.toObject() : null,
        };
    }
}

export { User };
