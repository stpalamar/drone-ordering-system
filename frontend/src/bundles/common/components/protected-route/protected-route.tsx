import { Navigate } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { type ReactNode } from '~/bundles/common/types/types.js';

type Properties = {
    children: ReactNode;
};

const ProtectedRoute: React.FC<Properties> = ({ children }) => {
    const { user } = useAppSelector(({ auth }) => auth);

    if (!user) {
        return <Navigate to={AppRoute.SIGN_IN} />;
    }

    return children;
};

export { ProtectedRoute };
