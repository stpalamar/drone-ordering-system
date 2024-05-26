import { User } from 'lucide-react';

import { Loader } from '~/bundles/common/components/components.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '~/bundles/common/components/ui/sheet.js';
import {
    formatDate,
    formatDateWithMonth,
} from '~/bundles/common/helpers/helpers.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';
import {
    useActivateManagerMutation,
    useDeactivateManagerMutation,
} from '~/bundles/managers/managers-api.js';
import { type UserResponseDto } from '~/bundles/users/types/types.js';

import { ManagerCard } from '../components.js';

type Properties = {
    manager: UserResponseDto;
};

const ManagerSheet: React.FC<Properties> = ({ manager }) => {
    const [deactivateManager, { isLoading: isDeactivating }] =
        useDeactivateManagerMutation();
    const [activateManager, { isLoading: isActivating }] =
        useActivateManagerMutation();

    const handleDeactivate = useCallback(() => {
        void deactivateManager(manager.id);
    }, [deactivateManager, manager.id]);

    const handleActivate = useCallback(() => {
        void activateManager(manager.id);
    }, [activateManager, manager.id]);

    return (
        <Sheet>
            <SheetTrigger>
                <ManagerCard manager={manager} />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-muted-foreground" />
                        Manager details
                    </SheetTitle>
                    <SheetDescription>
                        Here you can see more details about the manager or
                        deactivate account.
                    </SheetDescription>
                    {manager.details ? (
                        <dl className="grid gap-3 border rounded-md py-6 px-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm font-semibold">
                                    First name
                                </dt>
                                <dd className="text-sm">
                                    {manager.details.firstName}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-sm font-semibold">
                                    Last name
                                </dt>
                                <dd className="text-sm">
                                    {manager.details.lastName}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-sm font-semibold">Phone</dt>
                                <dd className="text-sm">
                                    {manager.details.phone}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-sm font-semibold">Email</dt>
                                <dd className="text-sm">{manager.email}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-sm font-semibold">
                                    Date of birth
                                </dt>
                                <dd className="text-sm">
                                    {formatDateWithMonth(
                                        new Date(manager.details.dateOfBirth),
                                    )}
                                </dd>
                            </div>
                            {manager.deletedAt && (
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm font-semibold">
                                        Deactivated at
                                    </dt>
                                    <dd className="text-sm">
                                        {formatDate(
                                            new Date(manager.deletedAt),
                                        )}
                                    </dd>
                                </div>
                            )}
                        </dl>
                    ) : (
                        <div className="flex items-center justify-center">
                            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                Manager does not complete registration
                            </h4>
                        </div>
                    )}
                    <SheetFooter>
                        {manager.deletedAt ? (
                            <Button
                                onClick={handleActivate}
                                className="w-24 bg-green-600 hover:bg-green-500"
                            >
                                {isActivating ? (
                                    <Loader variant="secondary" />
                                ) : (
                                    'Activate'
                                )}
                            </Button>
                        ) : (
                            <Button
                                variant="destructive"
                                onClick={handleDeactivate}
                                className="w-24"
                            >
                                {isDeactivating ? (
                                    <Loader variant="secondary" />
                                ) : (
                                    'Deactivate'
                                )}
                            </Button>
                        )}
                    </SheetFooter>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export { ManagerSheet };
