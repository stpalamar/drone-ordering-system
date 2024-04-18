import { Entity, PrimaryKey, Property } from '@mikro-orm/postgresql';

@Entity()
class Subject {
    @PrimaryKey({ index: true })
    id!: number;

    @Property()
    name: string;
}

export { Subject };
