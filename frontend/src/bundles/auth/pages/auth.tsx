import { Loader, Navigate } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppSelector,
    useCallback,
    useLocation,
} from '~/bundles/common/hooks/hooks.js';
import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/bundles/users/users.js';

import { useSignInMutation, useSignUpMutation } from '../auth-api.js';
import {
    EmailSentScreen,
    SignInForm,
    SignUpForm,
} from '../components/components.js';

const Auth: React.FC = () => {
    const { pathname } = useLocation();

    const { user, isRefreshing } = useAppSelector(({ auth }) => auth);

    const [signIn, { isLoading: isLoadingSignIn }] = useSignInMutation();

    const [signUp, { isLoading: isLoadingSignUp, isSuccess: isSignUpSuccess }] =
        useSignUpMutation();

    const handleSignInSubmit = useCallback(
        (payload: UserSignInRequestDto): void => {
            void signIn(payload);
        },
        [signIn],
    );

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpRequestDto): void => {
            void signUp(payload);
        },
        [signUp],
    );

    const getScreen = (screen: string): React.ReactNode => {
        switch (screen) {
            case AppRoute.SIGN_IN: {
                return (
                    <SignInForm
                        onSubmit={handleSignInSubmit}
                        isLoading={isLoadingSignIn}
                    />
                );
            }
            case AppRoute.SIGN_UP: {
                return (
                    <SignUpForm
                        onSubmit={handleSignUpSubmit}
                        isLoading={isLoadingSignUp}
                    />
                );
            }
        }

        return null;
    };

    if (user) {
        return <Navigate to={AppRoute.ROOT} />;
    }

    if (isSignUpSuccess) {
        return (
            <div className="flex h-screen justify-center items-center">
                <EmailSentScreen />;
            </div>
        );
    }

    return (
        <div className="flex h-screen justify-center items-center">
            {!isRefreshing && !user ? (
                getScreen(pathname)
            ) : (
                <Loader size="large" />
            )}
        </div>
    );
};

export { Auth };
