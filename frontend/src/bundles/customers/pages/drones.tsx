import { Loader } from '~/bundles/common/components/components.js';
import { Pagination } from '~/bundles/common/components/ui/pagination.js';
import { SortQuery } from '~/bundles/common/enums/enums.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { useGetProductsQuery } from '~/bundles/products/products-api.js';

import { ProductCard } from '../components/components.js';

const Drones: React.FC = () => {
    const [page, setPage] = useState(1);

    const { data: products, isLoading } = useGetProductsQuery({
        page: page,
        isActive: true,
        dateSort: SortQuery.DESC,
        totalSalesSort: SortQuery.DESC,
        limit: 8,
    });

    const handlePageChange = useCallback(
        (page: number) => {
            setPage(page);
        },
        [setPage],
    );

    return (
        <main className="grid flex-1 items-start justify-center gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {isLoading ? (
                <Loader size="large" />
            ) : (
                <>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Available drones
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                        {products &&
                            products.items.length > 0 &&
                            products.items.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                    </div>
                    <div>
                        {products && (
                            <Pagination
                                currentPage={products.page}
                                totalPages={products.totalPages}
                                setCurrentPage={handlePageChange}
                            />
                        )}
                    </div>
                </>
            )}
        </main>
    );
};

export { Drones };
