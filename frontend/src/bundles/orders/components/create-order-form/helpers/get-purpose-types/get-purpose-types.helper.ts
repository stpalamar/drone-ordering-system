import { type ProductTypesDto } from '~/bundles/products/types/types.js';

const getPurposeTypes = (
    wingsTypeValue: string | null,
    productTypes: ProductTypesDto | null,
): string[] => {
    if (!productTypes) {
        return [];
    }
    if (!wingsTypeValue) {
        return productTypes.purposes.map((item) => item.purpose);
    }
    if (wingsTypeValue) {
        return (
            productTypes.wingsTypes.find(
                (item) => item.wingsType === wingsTypeValue,
            )?.purposes ?? []
        );
    }
    return [];
};

export { getPurposeTypes };
