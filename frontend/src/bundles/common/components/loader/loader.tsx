import { cva, type VariantProps } from 'class-variance-authority';

import DroneIcon from '~/assets/img/icons/drone-icon.svg?react';
import { cn } from '~/bundles/common/lib/utils.js';

type Properties = {
    isOverflow?: boolean;
} & VariantProps<typeof loaderVariants>;

const loaderVariants = cva('animate-load', {
    variants: {
        variant: {
            default: 'text-primary',
            secondary: 'text-secondary',
        },
        size: {
            default: 'w-4 h-4',
            medium: 'w-8 h-8',
            large: 'w-12 h-12',
        },
    },
    defaultVariants: {
        size: 'default',
        variant: 'default',
    },
});

const Loader: React.FC<Properties> = ({ size, variant, isOverflow }) => {
    return (
        <div
            className={cn(
                isOverflow
                    ? 'flex flex-1 items-center justify-center absolute left-1/2 top-1/2'
                    : 'inline',
            )}
        >
            <DroneIcon className={cn(loaderVariants({ size, variant }))} />
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export { Loader };
