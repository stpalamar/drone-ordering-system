import { type RouteObject as LibraryRouteObject } from 'react-router-dom';

import { type RequiredPermission } from './types.js';

type RouteObject = LibraryRouteObject & {
    isPrivate?: boolean;
    permissions?: RequiredPermission[];
};

export { type RouteObject };
