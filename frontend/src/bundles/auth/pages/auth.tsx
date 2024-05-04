import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppSelector,
    useCallback,
    useEffect,
    useLocation,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';
import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/bundles/users/users.js';

import { useSignInMutation, useSignUpMutation } from '../auth-api.js';
import { SignInForm, SignUpForm } from '../components/components.js';

const Auth: React.FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { user } = useAppSelector(({ auth }) => auth);

    const [signIn, { isLoading: isLoadingSignIn }] = useSignInMutation();

    const [signUp, { isLoading: isLoadingSignUp }] = useSignUpMutation();

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

    useEffect(() => {
        if (user) {
            navigate(AppRoute.ROOT);
        }
    }, [user, navigate]);
    return (
        <div className="flex h-screen justify-center items-center">
            {getScreen(pathname)}
        </div>
    );
};

export { Auth };
