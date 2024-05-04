import { type ProductTypesDto } from '~/bundles/products/types/types.js';

const getWingsTypes = (
    purposeValue: string | null,
    productTypes: ProductTypesDto | null,
): string[] => {
    if (!productTypes) {
        return [];
    }
    if (!purposeValue) {
        return productTypes.wingsTypes.map((item) => item.wingsType);
    }
    if (purposeValue) {
        return (
            productTypes.purposes.find((item) => item.purpose === purposeValue)
                ?.wingsTypes ?? []
        );
    }
    return [];
};

export { getWingsTypes };
