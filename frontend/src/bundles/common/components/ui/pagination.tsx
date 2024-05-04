import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { cn } from '~/bundles/common/lib/utils.js';
import {
    Button,
    ButtonProps,
    buttonVariants,
} from '~/bundles/common/components/ui/button.js';
import { Link } from 'react-router-dom';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';

const PaginationNav = ({
    className,
    ...props
}: React.ComponentProps<'nav'>) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn('mx-auto flex w-full justify-center', className)}
        {...props}
    />
);
PaginationNav.displayName = 'PaginationNav';

const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn('flex flex-row items-center gap-1', className)}
        {...props}
    />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
    React.ComponentProps<'a'>;

const PaginationLink = ({
    className,
    isActive,
    size = 'icon',
    ...props
}: PaginationLinkProps) => (
    <a
        aria-current={isActive ? 'page' : undefined}
        className={cn(
            buttonVariants({
                variant: isActive ? 'outline' : 'ghost',
                size,
            }),
            className,
            'select-none',
        )}
        {...props}
    />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to previous page"
        size="default"
        className={cn('gap-1 pl-2.5', className)}
        {...props}
    >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
    </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to next page"
        size="default"
        className={cn('gap-1 pr-2.5', className)}
        {...props}
    >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
    </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
    className,
    ...props
}: React.ComponentProps<'span'>) => (
    <span
        aria-hidden
        className={cn('flex h-9 w-9 items-center justify-center', className)}
        {...props}
    >
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">More pages</span>
    </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

type PaginationProps = {
    totalPages: number;
    totalPagesToDisplay?: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
    totalPages,
    totalPagesToDisplay = 5,
    currentPage,
    setCurrentPage,
}) => {
    const showLeftEllipsis = currentPage - 1 > totalPagesToDisplay / 2;
    const showRightEllipsis =
        totalPages - currentPage + 1 > totalPagesToDisplay / 2;
    const getPageNumbers = () => {
        if (totalPages <= totalPagesToDisplay) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
            const half = Math.floor(totalPagesToDisplay / 2);
            // To ensure that the current page is always in the middle
            let start = currentPage - half;
            let end = currentPage + half;
            // If the current page is near the start
            if (start < 1) {
                start = 1;
                end = totalPagesToDisplay;
            }
            // If the current page is near the end
            if (end > totalPages) {
                start = totalPages - totalPagesToDisplay + 1;
                end = totalPages;
            }
            // If showLeftEllipsis is true, add an ellipsis before the start page
            if (showLeftEllipsis) {
                start++;
            }
            // If showRightEllipsis is true, add an ellipsis after the end page
            if (showRightEllipsis) {
                end--;
            }
            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        }
    };

    const renderPaginationItems = () => {
        const pageNumbers = getPageNumbers();
        return pageNumbers.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
                <PaginationLink
                    isActive={pageNumber === currentPage}
                    onClick={() => setCurrentPage(pageNumber)}
                >
                    {pageNumber}
                </PaginationLink>
            </PaginationItem>
        ));
    };

    return (
        <PaginationNav>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() =>
                            currentPage > 1 && setCurrentPage(currentPage - 1)
                        }
                        aria-disabled={currentPage === 1}
                    />
                </PaginationItem>
                {showLeftEllipsis && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                {renderPaginationItems()}
                {showRightEllipsis && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationNext
                        onClick={() =>
                            currentPage < totalPages &&
                            setCurrentPage(currentPage + 1)
                        }
                        aria-disabled={currentPage === totalPages}
                    />
                </PaginationItem>
            </PaginationContent>
        </PaginationNav>
    );
};

export {
    Pagination,
    PaginationNav,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
};
