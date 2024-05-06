import { File, ListFilter, PlusCircle } from 'lucide-react';

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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/bundles/common/components/ui/dialog.js';
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
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '~/bundles/common/components/ui/tabs.js';
import {
    PermissionAction,
    PermissionSubject,
} from '~/bundles/common/enums/enums.js';
import { getFileForm } from '~/bundles/common/helpers/helpers.js';
import {
    useAbility,
    useCallback,
    useSearchParams,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { useUploadFileMutation } from '~/bundles/files/files-api.js';
import {
    CreateProductForm,
    ProductsTable,
} from '~/bundles/products/components/components.js';
import {
    useCreateProductMutation,
    useDeleteProductMutation,
    useGetProductsQuery,
} from '~/bundles/products/products-api.js';
import { type ProductRequestDto } from '~/bundles/products/types/types.js';

const Products: React.FC = () => {
    const ability = useAbility(AbilityContext);

    const [searchParameters, setSearchParameters] = useSearchParams({
        page: '1',
    });

    const handlePageChange = useCallback(
        (page: number) => {
            setSearchParameters({ page: String(page) });
        },
        [setSearchParameters],
    );

    const [open, setOpen] = useState(false);

    const { data: products, isLoading } = useGetProductsQuery(
        Number(searchParameters.get('page')),
    );

    const [createProduct, { isLoading: isLoadingCreate }] =
        useCreateProductMutation();
    const [uploadFile, { isLoading: isLoadingImage }] = useUploadFileMutation();

    const [deleteProduct, { isLoading: isLoadingDelete }] =
        useDeleteProductMutation();

    const handleCreateProduct = useCallback(
        async (payload: ProductRequestDto, canvas: HTMLCanvasElement) => {
            const form = await getFileForm(canvas);
            const createdImage = await uploadFile(form).unwrap();
            if (createdImage) {
                void createProduct({
                    ...payload,
                    image: createdImage,
                });
                void setOpen(false);
            }
        },
        [createProduct, uploadFile],
    );

    const handleDeleteProduct = useCallback(
        (id: number) => {
            void deleteProduct(id);
        },
        [deleteProduct],
    );

    const canCreate = ability.can(
        PermissionAction.DELETE,
        PermissionSubject.PRODUCT,
    );
    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="draft">Draft</TabsTrigger>
                        <TabsTrigger
                            value="archived"
                            className="hidden sm:flex"
                        >
                            Archived
                        </TabsTrigger>
                    </TabsList>
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
                                        Filter
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Active
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Draft
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Archived
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    size="sm"
                                    className="h-8 gap-1"
                                    disabled={!canCreate}
                                >
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Add Product
                                    </span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Create new product
                                    </DialogTitle>
                                    <DialogDescription>
                                        Fill in the details below to create a
                                        new product.
                                    </DialogDescription>
                                </DialogHeader>
                                <CreateProductForm
                                    onSubmit={handleCreateProduct}
                                    isLoading={
                                        isLoadingCreate || isLoadingImage
                                    }
                                />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <TabsContent value="all">
                    <Card x-chunk="dashboard-06-chunk-0">
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
                </TabsContent>
            </Tabs>
        </main>
    );
};

export { Products };
