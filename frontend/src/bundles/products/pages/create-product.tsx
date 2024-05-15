import { toast } from 'sonner';

import {
    AbilityContext,
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
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';
import { CreateProductForm } from '~/bundles/products/components/components.js';
import { useCreateProductMutation } from '~/bundles/products/products-api.js';
import { type ProductRequestDto } from '~/bundles/products/types/types.js';

const CreateProduct: React.FC = () => {
    const ability = useAbility(AbilityContext);
    const navigate = useNavigate();
    const [createProduct, { isLoading }] = useCreateProductMutation();

    const handleCreateProduct = useCallback(
        async (payload: ProductRequestDto) => {
            const result = await createProduct(payload).unwrap();
            if (result) {
                navigate(AppRoute.ADMIN_PRODUCTS);
            }
        },
        [createProduct, navigate],
    );

    const cannotEdit = ability.cannot(
        PermissionAction.UPDATE,
        PermissionSubject.PRODUCT,
    );

    if (cannotEdit) {
        toast.error('You do not have permission to create a product');
        return <Navigate to={AppRoute.ADMIN_PRODUCTS} />;
    }

    return (
        <CreateProductForm
            onSubmit={handleCreateProduct}
            isLoading={isLoading}
        />
    );
};

export { CreateProduct };
