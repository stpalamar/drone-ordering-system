import { Entity, PrimaryKey, Property } from '@mikro-orm/postgresql';

import { HelperService } from '../helpers/helpers';

@Entity({ abstract: true })
export abstract class BaseEntity {
    @PrimaryKey({ index: true })
    id!: number;

    @Property({ hidden: true })
    createdAt? = HelperService.getTimeInUtc(new Date());

    @Property({
        onUpdate: () => HelperService.getTimeInUtc(new Date()),
        hidden: true,
    })
    updatedAt? = HelperService.getTimeInUtc(new Date());
}
