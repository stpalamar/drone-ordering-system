import {
    Card,
    CardContent,
    CardHeader,
} from '~/bundles/common/components/ui/card.js';
import { formatPrice } from '~/bundles/common/helpers/helpers.js';
import { type ProductResponseDto } from '~/bundles/products/types/types.js';

type Properties = {
    product: ProductResponseDto;
};

const ProductCard: React.FC<Properties> = ({ product }) => {
    return (
        <Card>
            <CardHeader>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    {product.wingsType}
                </h4>
                <p>{product.purpose}</p>
                <p className="text-sm font-medium leading-none">
                    Base price: {formatPrice(product.price.basePrice)}
                </p>
            </CardHeader>
            <CardContent>
                <img
                    src={product.image.url}
                    alt={`${product.purpose} ${product.wingsType}`}
                    className=" rounded-lg size-[24rem] md:size-full"
                />
            </CardContent>
        </Card>
    );
};

export { ProductCard };
