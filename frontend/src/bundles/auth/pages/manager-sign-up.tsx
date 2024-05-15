import { Navigate } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useCallback, useSearchParams } from '~/bundles/common/hooks/hooks.js';
import { type UserSignUpRequestDto } from '~/bundles/users/types/types.js';

import { useSignUpManagerMutation } from '../auth-api.js';
import { EmailSentScreen, SignUpForm } from '../components/components.js';

const ManagerSignUp: React.FC = () => {
    const [signUpManager, { isLoading, isSuccess }] =
        useSignUpManagerMutation();

    const [searchParameters] = useSearchParams();

    const token = searchParameters.get('token');

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpRequestDto): void => {
            if (!token) {
                return;
            }
            void signUpManager({
                ...payload,
                token,
            });
        },
        [signUpManager, token],
    );

    if (!token) {
        return <Navigate to={AppRoute.ROOT} />;
    }

    return (
        <div className="flex h-screen justify-center items-center">
            {isSuccess ? (
                <EmailSentScreen />
            ) : (
                <SignUpForm
                    onSubmit={handleSignUpSubmit}
                    isLoading={isLoading}
                    isManager
                />
            )}
        </div>
    );
};

export { ManagerSignUp };
