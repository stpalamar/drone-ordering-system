import { NavLink } from 'react-router-dom';

import { type AppRoute } from '~/bundles/common/enums/enums.js';
import { cn } from '~/bundles/common/lib/utils.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type Properties = {
    to: ValueOf<typeof AppRoute>;
    children: React.ReactNode;
    className?: string;
};

const Link: React.FC<Properties> = ({ children, to, className }) => (
    <NavLink to={to} className={cn(className)}>
        {children}
    </NavLink>
);

export { Link };
