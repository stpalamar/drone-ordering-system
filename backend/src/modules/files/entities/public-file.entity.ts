import { Entity, PrimaryKey, Property } from '@mikro-orm/postgresql';

@Entity()
class PublicFile {
    @PrimaryKey({ index: true })
    id!: number;

    @Property()
    url!: string;

    @Property()
    key!: string;

    toObject() {
        return {
            id: this.id,
            url: this.url,
            key: this.key,
        };
    }
}

export { PublicFile };
