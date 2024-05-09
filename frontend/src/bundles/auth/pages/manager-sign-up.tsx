import { Navigate } from '~/bundles/common/components/components.js';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '~/bundles/common/components/ui/card.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useCallback, useSearchParams } from '~/bundles/common/hooks/hooks.js';
import { type UserSignUpRequestDto } from '~/bundles/users/types/types.js';

import { useSignUpManagerMutation } from '../auth-api.js';
import { SignUpForm } from '../components/components.js';

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

    const successScreen = (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Confirm your email</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                Link for manager account activation has been sent to your email.
                Check you inbox and follow the instructions to complete the
                process.
                <CardDescription>
                    If you haven&apos;t received the email, please check your
                    spam folder.
                </CardDescription>
            </CardContent>
        </Card>
    );

    if (!token) {
        return <Navigate to={AppRoute.ROOT} />;
    }

    return (
        <div className="flex h-screen justify-center items-center">
            {isSuccess ? (
                successScreen
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
