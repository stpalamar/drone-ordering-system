import {
    createBrowserRouter,
    RouterProvider as LibraryRouterProvider,
} from 'react-router-dom';

import {
    PermissionedRoute,
    ProtectedRoute,
} from '~/bundles/common/components/components.js';
import {
    type LibraryRouteObject,
    type RequiredPermission,
    type RouteObject,
} from '~/bundles/common/types/types.js';

type Properties = {
    routes: RouteObject[];
};

const renderRoute = (
    element: React.ReactNode,
    shouldProtect: boolean,
    permissions: RequiredPermission[] | null,
): React.ReactNode => {
    if (shouldProtect && permissions) {
        return (
            <ProtectedRoute>
                <PermissionedRoute permissions={permissions}>
                    {element}
                </PermissionedRoute>
            </ProtectedRoute>
        );
    }
    if (permissions) {
        return (
            <PermissionedRoute permissions={permissions}>
                {element}
            </PermissionedRoute>
        );
    }
    if (shouldProtect) {
        return <ProtectedRoute>{element}</ProtectedRoute>;
    }
    return element;
};

const RouterProvider: React.FC<Properties> = ({ routes }) => {
    const mapRoutes = (
        routes: RouteObject[],
        isAlreadyProtected = false,
    ): LibraryRouteObject[] =>
        routes.map(
            ({
                isPrivate,
                element,
                children,
                path,
                permissions,
            }): LibraryRouteObject => {
                const shouldProtect = !isAlreadyProtected && Boolean(isPrivate);
                return {
                    ...(element && {
                        element: renderRoute(
                            element,
                            shouldProtect,
                            permissions ?? null,
                        ),
                    }),
                    ...(children?.length && {
                        children: mapRoutes(
                            children,
                            isAlreadyProtected || shouldProtect,
                        ),
                    }),
                    path,
                };
            },
        );

    const mappedRoutes = mapRoutes(routes);
    return <LibraryRouterProvider router={createBrowserRouter(mappedRoutes)} />;
};

export { RouterProvider };
