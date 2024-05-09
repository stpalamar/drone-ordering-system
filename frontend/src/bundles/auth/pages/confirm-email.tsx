import { useConfirmEmailMutation } from '~/bundles/auth/auth-api.js';
import { Navigate } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useCallback,
    useEffect,
    useNavigate,
    useSearchParams,
} from '~/bundles/common/hooks/hooks.js';
import { type UserDetailsDto } from '~/bundles/users/types/types.js';

import { ConfirmEmailForm } from '../components/components.js';

const ConfirmEmail: React.FC = () => {
    const navigate = useNavigate();
    const [searchParameters] = useSearchParams();

    const token = searchParameters.get('token');

    const [confirmEmail, { isLoading, data }] = useConfirmEmailMutation();

    const handleConfirmEmail = useCallback(
        (payload: UserDetailsDto): void => {
            if (!token) {
                return;
            }
            void confirmEmail({ userDetails: payload, token });
        },
        [confirmEmail, token],
    );

    useEffect(() => {
        if (data) {
            void navigate(AppRoute.ROOT, { replace: true });
        }
    }, [data, navigate]);

    if (!token) {
        return <Navigate to={AppRoute.ROOT} />;
    }

    return (
        <div className="flex h-screen justify-center items-center">
            <ConfirmEmailForm
                onSubmit={handleConfirmEmail}
                isLoading={isLoading}
            />
        </div>
    );
};

export { ConfirmEmail };
