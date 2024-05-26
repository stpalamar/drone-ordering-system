import {
    Card,
    CardContent,
    CardFooter,
} from '~/bundles/common/components/ui/card.js';
import { type ProductResponseDto } from '~/bundles/products/types/types.js';

type Properties = {
    product: ProductResponseDto;
};

const TopProductCard: React.FC<Properties> = ({ product }) => {
    return (
        <Card className="w-[20rem]">
            <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                    <img
                        src={product.image.url}
                        alt={`${product.purpose} ${product.wingsType}`}
                        className="rounded-lg min-size-[14rem] max-size-[18rem] aspect-square object-cover"
                    />
                </div>
            </CardContent>
            <CardFooter>
                <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                        {product.purpose} {product.wingsType}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {product.totalSales} sold
                    </p>
                </div>
            </CardFooter>
        </Card>
    );
};

export { TopProductCard };
