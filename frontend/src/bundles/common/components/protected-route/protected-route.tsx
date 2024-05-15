import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppSelector,
    useEffect,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';
import { type ReactNode } from '~/bundles/common/types/types.js';

type Properties = {
    children: ReactNode;
};

const ProtectedRoute: React.FC<Properties> = ({ children }) => {
    const navigate = useNavigate();
    const { user, isRefreshing } = useAppSelector(({ auth }) => auth);

    useEffect(() => {
        if (!user && !isRefreshing) {
            navigate(AppRoute.ROOT, { replace: true });
        }
    }, [user, isRefreshing, navigate]);

    return children;
};

export { ProtectedRoute };
