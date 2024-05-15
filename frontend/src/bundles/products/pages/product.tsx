import { toast } from 'sonner';

import {
    AbilityContext,
    Loader,
    Navigate,
} from '~/bundles/common/components/components.js';
import {
    AppRoute,
    PermissionAction,
    PermissionSubject,
} from '~/bundles/common/enums/enums.js';
import {
    useAbility,
    useCallback,
    useParams,
} from '~/bundles/common/hooks/hooks.js';
import { CreateProductForm } from '~/bundles/products/components/components.js';
import {
    useGetProductByIdQuery,
    useUpdateProductMutation,
} from '~/bundles/products/products-api.js';
import { type ProductRequestDto } from '~/bundles/products/types/types.js';

const Product: React.FC = () => {
    const ability = useAbility(AbilityContext);
    const { id } = useParams();

    const {
        data: product,
        isLoading,
        isError,
    } = useGetProductByIdQuery(Number(id));

    const [updateProduct, { isLoading: isLoadingUpdate }] =
        useUpdateProductMutation();

    const handleEditProduct = useCallback(
        async (payload: ProductRequestDto) => {
            const result = await updateProduct({
                id: Number(id),
                item: payload,
            }).unwrap();
            if (result) {
                toast.success('Product updated successfully');
            }
        },
        [id, updateProduct],
    );

    const canEdit = ability.can(
        PermissionAction.UPDATE,
        PermissionSubject.PRODUCT,
    );

    if (isLoading) {
        return <Loader size="medium" isOverflow />;
    }

    if (isError || !product) {
        return <Navigate to={AppRoute.ADMIN_PRODUCTS} />;
    }

    return (
        <div>
            <CreateProductForm
                onSubmit={handleEditProduct}
                isLoading={isLoadingUpdate}
                defaultValues={product}
                disabled={product.totalSales > 0 || !canEdit}
                canEdit={canEdit}
                isEdit
            />
        </div>
    );
};

export { Product };
