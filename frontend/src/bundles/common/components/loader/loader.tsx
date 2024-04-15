import DroneIcon from '~/assets/img/icons/drone-icon.svg?react';
import { ComponentSize } from '~/bundles/common/enums/enums.js';
import { cn } from '~/bundles/common/lib/utils.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type Properties = {
    size?: ValueOf<typeof ComponentSize>;
};

const Loader: React.FC<Properties> = ({ size = ComponentSize.SMALL }) => {
    const sizeToClass: Record<ValueOf<typeof ComponentSize>, string> = {
        [ComponentSize.SMALL]: 'w-4 h-4',
        [ComponentSize.MEDIUM]: 'w-8 h-8',
        [ComponentSize.LARGE]: 'w-12 h-12',
    };

    return (
        <DroneIcon
            className={cn(sizeToClass[size], 'animate-load text-secondary')}
        />
    );
};

export { Loader };
