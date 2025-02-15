import { MoreHorizontal } from 'lucide-react';

import placeholder from '~/assets/img/placeholder.svg';
import {
    AbilityContext,
    Loader,
} from '~/bundles/common/components/components.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '~/bundles/common/components/ui/dialog.js';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '~/bundles/common/components/ui/dropdown-menu.js';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '~/bundles/common/components/ui/table.js';
import {
    AppRoute,
    PermissionAction,
    PermissionSubject,
} from '~/bundles/common/enums/enums.js';
import {
    configureUrlString,
    formatDate,
    formatPrice,
} from '~/bundles/common/helpers/helpers.js';
import {
    useAbility,
    useCallback,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { type ProductResponseDto } from '~/bundles/products/types/types.js';

type Properties = {
    products: ProductResponseDto[] | null;
    isLoading: boolean;
    isLoadingDelete: boolean;
    onDelete: (id: number) => void;
    isActive: boolean;
};

const ProductsTable: React.FC<Properties> = ({
    products,
    isLoading,
    isLoadingDelete,
    onDelete,
    isActive,
}) => {
    const navigate = useNavigate();
    const ability = useAbility(AbilityContext);

    const [productToDelete, setProductToDelete] =
        useState<ProductResponseDto | null>(null);
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

    const handleOpenDeleteDialog = useCallback(
        (product: ProductResponseDto) => {
            setProductToDelete(product);
            setDeleteOpen(true);
        },
        [setProductToDelete, setDeleteOpen],
    );

    const handleClickView = useCallback(
        (id: number) => {
            const path = configureUrlString(AppRoute.ADMIN_PRODUCT_$ID, {
                id: String(id),
            });
            navigate(path);
        },
        [navigate],
    );

    const handleDelete = useCallback(() => {
        if (!productToDelete) {
            return;
        }
        onDelete(productToDelete.id);
        if (!isLoadingDelete) {
            setDeleteOpen(false);
        }
    }, [onDelete, setDeleteOpen, productToDelete, isLoadingDelete]);

    const canDelete = ability.can(
        PermissionAction.DELETE,
        PermissionSubject.PRODUCT,
    );

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Purpose</TableHead>
                        <TableHead>Wings type</TableHead>
                        <TableHead className="hidden md:table-cell">
                            Base price
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            Total Sales
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            Created at
                        </TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading && (
                        <TableRow>
                            <TableCell colSpan={7} className="p-24">
                                <Loader size="medium" isOverflow />
                            </TableCell>
                        </TableRow>
                    )}
                    {!isLoading && products?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={7} className="p-24">
                                <p className="text-center text-gray-500">
                                    No products found
                                </p>
                            </TableCell>
                        </TableRow>
                    )}
                    {products &&
                        products.length > 0 &&
                        products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="hidden sm:table-cell">
                                    <img
                                        src={product.image.url || placeholder}
                                        alt="Product"
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        width="64"
                                    />
                                </TableCell>
                                <TableCell className="font-medium">
                                    {product.purpose}
                                </TableCell>
                                <TableCell>{product.wingsType}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {formatPrice(product.price.basePrice)}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {product.totalSales}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {formatDate(new Date(product.createdAt))}
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                aria-haspopup="true"
                                                size="icon"
                                                variant="ghost"
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Toggle menu
                                                </span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>
                                                Actions
                                            </DropdownMenuLabel>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    handleClickView(product.id)
                                                }
                                            >
                                                View
                                            </DropdownMenuItem>
                                            {isActive && (
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleOpenDeleteDialog(
                                                            product,
                                                        )
                                                    }
                                                    disabled={!canDelete}
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will marked as
                            deleted and you will not be able to create new
                            orders with this product. All existing orders will
                            contain this product.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <img
                            src={productToDelete?.image.url || placeholder}
                            alt="Product"
                            className="aspect-square rounded-md object-cover size-36 items-start justify-self-center"
                        />
                        <p>Product: {productToDelete?.purpose}</p>
                        <p>Wings type: {productToDelete?.wingsType}</p>
                        <p>
                            Base price:{' '}
                            {formatPrice(productToDelete?.price.basePrice ?? 0)}
                        </p>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={handleDelete}
                            disabled={isLoadingDelete}
                        >
                            {isLoadingDelete ? (
                                <Loader variant="secondary" />
                            ) : (
                                'Delete'
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => setDeleteOpen(false)}
                        >
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export { ProductsTable };
