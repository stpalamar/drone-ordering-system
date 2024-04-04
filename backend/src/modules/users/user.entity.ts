import {
    Entity,
    Property,
    BeforeCreate,
    BeforeUpdate,
    BeforeUpsert,
    EventArgs,
} from '@mikro-orm/core';
import { BaseEntity } from '@common/database/base.entity';
import { HelperService } from '@common/helpers/helpers';

@Entity()
class User extends BaseEntity {
    @Property({ unique: true })
    email!: string;

    @Property({ hidden: true })
    password!: string;

    @BeforeCreate()
    @BeforeUpdate()
    @BeforeUpsert()
    async hashPassword(arguments_: EventArgs<this>) {
        if (arguments_.changeSet?.payload?.password)
            this.password = await HelperService.encryptSync(this.password);
    }

    toJSON() {
        return {
            id: this.id,
            email: this.email,
        };
    }
}

export default User;
