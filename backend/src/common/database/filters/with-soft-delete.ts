import { Filter } from '@mikro-orm/postgresql';

const WithSoftDelete = (): ClassDecorator => {
    return Filter({
        name: 'softDelete',
        cond: {
            deletedAt: null,
        },
        default: true,
    });
};

export { WithSoftDelete };
