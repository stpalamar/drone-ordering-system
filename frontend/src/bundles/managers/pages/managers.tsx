import { ClipboardPlus, File, Search } from 'lucide-react';

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
import { Input } from '~/bundles/common/components/ui/input.js';
import { Pagination } from '~/bundles/common/components/ui/pagination.js';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '~/bundles/common/components/ui/tabs.js';
import { useCallback, useSearchParams } from '~/bundles/common/hooks/hooks.js';
import { CreateRegistrationUrl } from '~/bundles/managers/components/components.js';
import { useGetManagersQuery } from '~/bundles/managers/managers-api.js';

import { ManagerCard } from '../components/manager-card/manager-card.js';

const Managers: React.FC = () => {
    const [searchParameters, setSearchParameters] = useSearchParams({
        page: '1',
    });

    const handlePageChange = useCallback(
        (page: number) => {
            setSearchParameters({ page: String(page) });
        },
        [setSearchParameters],
    );

    const { data: managers, isLoading } = useGetManagersQuery(
        Number(searchParameters.get('page')),
    );

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
                <Tabs defaultValue="active">
                    <div className="flex items-center">
                        <TabsList>
                            <TabsTrigger value="active">Active</TabsTrigger>
                            <TabsTrigger value="deactivated">
                                Deactivated
                            </TabsTrigger>
                        </TabsList>
                        <div className="flex items-center gap-2 ml-auto">
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-8 gap-1"
                            >
                                <File className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Export
                                </span>
                            </Button>
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
                    <div className="mt-4 w-full flex-1">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search managers..."
                                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                />
                            </div>
                        </form>
                    </div>
                    {isLoading ? (
                        <Loader size="medium" isOverflow />
                    ) : (
                        <TabsContent value="active" className="mt-8">
                            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                                {managers?.items.map((manager) => (
                                    <ManagerCard
                                        key={manager.id}
                                        manager={manager}
                                    />
                                ))}
                            </div>
                            <div className="mt-4">
                                {managers && (
                                    <Pagination
                                        currentPage={managers.page}
                                        totalPages={managers.totalPages}
                                        setCurrentPage={handlePageChange}
                                    />
                                )}
                            </div>
                        </TabsContent>
                    )}
                </Tabs>
            </div>
        </main>
    );
};

export { Managers };
