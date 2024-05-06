import { createMongoAbility } from '@casl/ability';

import { type AppAbility } from '~/bundles/common/types/types.js';
import { store } from '~/framework/store/store.js';

const ability = createMongoAbility<AppAbility>();

store.instance.subscribe(() => {
    const { user } = store.instance.getState().auth;
    if (user && user.permissions) {
        const permissions = user.permissions.map((permission) => ({
            action: permission.action,
            subject: permission.subject,
        }));
        ability.update(permissions);
    }
});

export { ability };
