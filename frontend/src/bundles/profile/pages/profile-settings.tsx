import { DEFAULT_USER_DETAILS_PAYLOAD } from '~/bundles/auth/components/confirm-email-form/constants/constants.js';
import { Loader } from '~/bundles/common/components/components.js';
import { useAppSelector, useCallback } from '~/bundles/common/hooks/hooks.js';
import { type UserDetailsDto } from '~/bundles/users/types/types.js';
import { useUpdateUserMutation } from '~/bundles/users/users-api.js';

import { UserDetailsForm } from '../components/components.js';

const ProfileSettings: React.FC = () => {
    const { user } = useAppSelector(({ auth }) => auth);

    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const handleSaveUserDetails = useCallback(
        (data: UserDetailsDto) => {
            if (user) {
                void updateUser({ id: user.id, item: data });
            }
        },
        [updateUser, user],
    );

    if (!user) {
        return <Loader size="medium" isOverflow />;
    }

    return (
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold">Settings</h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
                <div className="grid gap-6">
                    <UserDetailsForm
                        onSubmit={handleSaveUserDetails}
                        userDetails={
                            user.details ?? DEFAULT_USER_DETAILS_PAYLOAD
                        }
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </main>
    );
};

export { ProfileSettings };
