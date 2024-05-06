import { type MongoAbility } from '@casl/ability';

import { type ValueOf } from '../../../types/types.js';
import {
    type PermissionAction,
    type PermissionSubject,
} from '../enums/enums.js';

type AppAbility = MongoAbility<
    [ValueOf<typeof PermissionAction>, ValueOf<typeof PermissionSubject>]
>;

export { type AppAbility };
