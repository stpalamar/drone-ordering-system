import { BaseEntity } from '@common/database/base.entity';
import { Entity, OneToOne, Property } from '@mikro-orm/postgresql';
import { PublicFile } from '@modules/files/entities/public-file.entity';

@Entity()
class UserDetails extends BaseEntity {
    @Property()
    firstName!: string;

    @Property()
    lastName!: string;

    @Property()
    phone!: string;

    @Property()
    dateOfBirth!: Date;

    @OneToOne({ nullable: true })
    avatar!: PublicFile | null;

    toObject() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone,
            dateOfBirth: this.dateOfBirth.toISOString(),
            avatar: this.avatar,
        };
    }
}

export { UserDetails };
