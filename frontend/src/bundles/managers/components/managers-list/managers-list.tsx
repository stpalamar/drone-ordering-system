import { Pagination } from '~/bundles/common/components/ui/pagination.js';
import { type PagedResponse } from '~/bundles/common/types/types.js';
import { type UserResponseDto } from '~/bundles/users/types/types.js';

import { ManagerSheet } from '../components.js';

type Properties = {
    managers: PagedResponse<UserResponseDto>;
    handlePageChange: (page: number) => void;
};

const ManagersList: React.FC<Properties> = ({ managers, handlePageChange }) => {
    return (
        <div className="mt-8">
            {managers?.items.length === 0 ? (
                <div className="flex justify-center h-[20rem] items-center">
                    <p>No managers found</p>
                </div>
            ) : (
                <>
                    <div className="grid gap-4 place-items-stretch md:grid-cols-2 lg:grid-cols-3">
                        {managers?.items.map((manager) => (
                            <ManagerSheet key={manager.id} manager={manager} />
                        ))}
                    </div>
                    <div className="mt-4">
                        {managers && (
                            <Pagination
                                currentPage={managers.page}
                                totalPages={managers.totalPages}
                                setCurrentPage={handlePageChange}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export { ManagersList };
