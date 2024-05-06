import { createContextualCan } from '@casl/react';
import { createContext } from 'react';

import { type AppAbility } from '~/bundles/common/types/types.js';
import { ability } from '~/framework/casl/casl.package.js';

const AbilityContext = createContext<AppAbility>(ability);
const Can = createContextualCan(AbilityContext.Consumer);

export { AbilityContext, Can };
