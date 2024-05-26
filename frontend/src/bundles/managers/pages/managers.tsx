import { ClipboardPlus } from 'lucide-react';

import { Loader } from '~/bundles/common/components/components.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/bundles/common/components/ui/dialog.js';
import { useCallback, useSearchParams } from '~/bundles/common/hooks/hooks.js';
import { cn } from '~/bundles/common/lib/utils.js';
import {
    CreateRegistrationUrl,
    ManagersList,
} from '~/bundles/managers/components/components.js';
import { useGetManagersQuery } from '~/bundles/managers/managers-api.js';

const Managers: React.FC = () => {
    const [searchParameters, setSearchParameters] = useSearchParams({
        page: '1',
        isActive: 'true',
    });

    const handlePageChange = useCallback(
        (page: number) => {
            setSearchParameters({
                page: String(page),
                isActive: searchParameters.get('isActive') ?? 'true',
            });
        },
        [searchParameters, setSearchParameters],
    );

    const handleTabChange = useCallback(
        (isActive: boolean) => {
            setSearchParameters({
                page: '1',
                isActive: String(isActive),
            });
        },
        [setSearchParameters],
    );

    const { data: managers, isLoading } = useGetManagersQuery({
        page: Number(searchParameters.get('page')),
        limit: 10,
        isActive: searchParameters.get('isActive') === 'true',
    });

    const activeTab = 'bg-background text-foreground shadow-sm';

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div>
                <div className="mb-8">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Managers
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Manage your employees and their permissions
                    </p>
                </div>
                <div>
                    <div className="flex items-center">
                        <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                            <Button
                                variant="tab"
                                size="tab"
                                className={cn(
                                    searchParameters.get('isActive') ===
                                        'true' && activeTab,
                                )}
                                onClick={() => handleTabChange(true)}
                            >
                                Active
                            </Button>
                            <Button
                                variant="tab"
                                size="tab"
                                className={cn(
                                    searchParameters.get('isActive') ===
                                        'false' && activeTab,
                                )}
                                onClick={() => handleTabChange(false)}
                            >
                                Deactivated
                            </Button>
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="sm" className="h-8 gap-1">
                                        <ClipboardPlus className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Sign up new manager
                                        </span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Manager registration URL
                                        </DialogTitle>
                                        <DialogDescription>
                                            Click the button below to generate
                                            new manager registration URL.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <CreateRegistrationUrl />
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button
                                                type="button"
                                                variant="outline"
                                            >
                                                Close
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    {isLoading || !managers ? (
                        <Loader size="medium" isOverflow />
                    ) : (
                        <ManagersList
                            managers={managers}
                            handlePageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

export { Managers };
