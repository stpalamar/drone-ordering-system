import { BaseEntity } from '@common/database/base.entity';
import { HelperService } from '@common/helpers/helpers';
import {
    BeforeCreate,
    BeforeUpdate,
    BeforeUpsert,
    Entity,
    EventArgs,
    ManyToOne,
    Property,
} from '@mikro-orm/postgresql';
import { Role } from '@modules/permission/entities/role.entity';

@Entity()
class User extends BaseEntity {
    @Property({ unique: true })
    email!: string;

    @Property()
    password!: string;

    @ManyToOne()
    role!: Role;

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
        };
    }
}

export { User };
