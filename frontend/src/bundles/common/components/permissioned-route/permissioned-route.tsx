import {
    AbilityContext,
    Navigate,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useAbility } from '~/bundles/common/hooks/hooks.js';
import {
    type ReactNode,
    type RequiredPermission,
} from '~/bundles/common/types/types.js';

type Properties = {
    children: ReactNode;
    permissions: RequiredPermission[];
};

const PermissionedRoute: React.FC<Properties> = ({ children, permissions }) => {
    const ability = useAbility(AbilityContext);

    const isAuthorized = permissions.some((permission) =>
        ability.can(permission[0], permission[1]),
    );

    if (!isAuthorized) {
        return <Navigate to={AppRoute.NOT_FOUND} replace />;
    }

    return children;
};

export { PermissionedRoute };
