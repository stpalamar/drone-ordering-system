import { Filter } from '@mikro-orm/postgresql';

type FilterArguments = {
    getAll?: boolean;
    getOnlyDeleted?: boolean;
};

const WithSoftDelete = (): ClassDecorator => {
    return Filter({
        name: 'softDelete',
        cond: ({ getAll, getOnlyDeleted }: FilterArguments = {}) => {
            if (getAll) {
                return {};
            }
            if (getOnlyDeleted) {
                return { deletedAt: { $ne: null } };
            }
            return { deletedAt: null };
        },
        default: true,
    });
};

export { WithSoftDelete };
