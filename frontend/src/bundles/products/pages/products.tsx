import { ListFilter, PlusCircle } from 'lucide-react';

import { AbilityContext } from '~/bundles/common/components/components.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/bundles/common/components/ui/card.js';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/bundles/common/components/ui/dropdown-menu.js';
import { Pagination } from '~/bundles/common/components/ui/pagination.js';
import {
    AppRoute,
    PermissionAction,
    PermissionSubject,
    SortQuery,
} from '~/bundles/common/enums/enums.js';
import {
    useAbility,
    useCallback,
    useNavigate,
    useSearchParams,
} from '~/bundles/common/hooks/hooks.js';
import { cn } from '~/bundles/common/lib/utils.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { ProductsTable } from '~/bundles/products/components/components.js';
import {
    useDeleteProductMutation,
    useGetProductsQuery,
} from '~/bundles/products/products-api.js';

const Products: React.FC = () => {
    const navigate = useNavigate();
    const ability = useAbility(AbilityContext);

    const [searchParameters, setSearchParameters] = useSearchParams({
        page: '1',
        isActive: 'true',
        dateSort: SortQuery.DESC,
        totalSalesSort: SortQuery.DESC,
    });

    const handlePageChange = useCallback(
        (page: number) => {
            setSearchParameters({
                page: String(page),
                isActive: searchParameters.get('isActive') ?? 'true',
                dateSort: searchParameters.get('dateSort') ?? SortQuery.DESC,
                totalSalesSort:
                    searchParameters.get('totalSalesSort') ?? SortQuery.DESC,
            });
        },
        [setSearchParameters, searchParameters],
    );

    const { data: products, isLoading } = useGetProductsQuery({
        page: Number(searchParameters.get('page')),
        isActive: searchParameters.get('isActive') === 'true',
        dateSort: searchParameters.get('dateSort') as ValueOf<typeof SortQuery>,
        totalSalesSort: searchParameters.get('totalSalesSort') as ValueOf<
            typeof SortQuery
        >,
        limit: 5,
    });

    const [deleteProduct, { isLoading: isLoadingDelete }] =
        useDeleteProductMutation();

    const handleDeleteProduct = useCallback(
        (id: number) => {
            void deleteProduct(id);
        },
        [deleteProduct],
    );

    const handleClickCreateProduct = useCallback(() => {
        navigate(AppRoute.ADMIN_PRODUCT_CREATE);
    }, [navigate]);

    const canCreate = ability.can(
        PermissionAction.DELETE,
        PermissionSubject.PRODUCT,
    );

    const handleTabChange = useCallback(
        (isActive: boolean) => {
            setSearchParameters({
                page: '1',
                isActive: String(isActive),
                dateSort: searchParameters.get('dateSort') ?? SortQuery.DESC,
                totalSalesSort:
                    searchParameters.get('totalSalesSort') ?? SortQuery.DESC,
            });
        },
        [searchParameters, setSearchParameters],
    );

    const handleDateSortChange = useCallback(
        (dateSort: ValueOf<typeof SortQuery>) => {
            setSearchParameters({
                page: '1',
                isActive: searchParameters.get('isActive') ?? 'true',
                dateSort,
                totalSalesSort:
                    searchParameters.get('totalSalesSort') ?? SortQuery.DESC,
            });
        },
        [searchParameters, setSearchParameters],
    );
    const handleTotalSalesSortChange = useCallback(
        (totalSalesSort: ValueOf<typeof SortQuery>) => {
            setSearchParameters({
                page: '1',
                isActive: searchParameters.get('isActive') ?? 'true',
                dateSort: searchParameters.get('dateSort') ?? SortQuery.DESC,
                totalSalesSort,
            });
        },
        [searchParameters, setSearchParameters],
    );

    const activeTab = 'bg-background text-foreground shadow-sm';

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
                <div className="flex items-center">
                    <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                        <Button
                            variant="tab"
                            size="tab"
                            className={cn(
                                searchParameters.get('isActive') === 'true' &&
                                    activeTab,
                            )}
                            onClick={() => handleTabChange(true)}
                        >
                            Active
                        </Button>
                        <Button
                            variant="tab"
                            size="tab"
                            className={cn(
                                searchParameters.get('isActive') === 'false' &&
                                    activeTab,
                            )}
                            onClick={() => handleTabChange(false)}
                        >
                            Archived
                        </Button>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 gap-1"
                                >
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Date
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem
                                    checked={
                                        searchParameters.get('dateSort') ===
                                        SortQuery.ASC
                                    }
                                    onClick={() =>
                                        handleDateSortChange(SortQuery.ASC)
                                    }
                                >
                                    Ascending
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={
                                        searchParameters.get('dateSort') ===
                                        SortQuery.DESC
                                    }
                                    onClick={() =>
                                        handleDateSortChange(SortQuery.DESC)
                                    }
                                >
                                    Descending
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 gap-1"
                                >
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Sales
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem
                                    checked={
                                        searchParameters.get(
                                            'totalSalesSort',
                                        ) === SortQuery.ASC
                                    }
                                    onClick={() =>
                                        handleTotalSalesSortChange(
                                            SortQuery.ASC,
                                        )
                                    }
                                >
                                    Ascending
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={
                                        searchParameters.get(
                                            'totalSalesSort',
                                        ) === SortQuery.DESC
                                    }
                                    onClick={() =>
                                        handleTotalSalesSortChange(
                                            SortQuery.DESC,
                                        )
                                    }
                                >
                                    Descending
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                            size="sm"
                            className="h-8 gap-1"
                            disabled={!canCreate}
                            onClick={handleClickCreateProduct}
                        >
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Add Product
                            </span>
                        </Button>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Products</CardTitle>
                        <CardDescription>
                            Manage your products and view their sales
                            performance.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ProductsTable
                            products={products ? products.items : null}
                            isLoading={isLoading}
                            isLoadingDelete={isLoadingDelete}
                            onDelete={handleDeleteProduct}
                            isActive={
                                searchParameters.get('isActive') === 'true'
                            }
                        />
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        {products && (
                            <Pagination
                                currentPage={products.page}
                                totalPages={products.totalPages}
                                setCurrentPage={handlePageChange}
                            />
                        )}
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
};

export { Products };
