import { useGetMeQuery } from '~/bundles/auth/auth-api.js';
import {
    Loader,
    RouterOutlet,
} from '~/bundles/common/components/components.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';

const App: React.FC = () => {
    const { isRefreshing } = useAppSelector(({ auth }) => auth);

    void useGetMeQuery();

    if (isRefreshing) {
        return (
            <div className="h-screen flex flex-col items-center justify-center">
                <Loader size="large" />
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-4">
                    Fetching data...
                </h3>
            </div>
        );
    }

    return <RouterOutlet />;
};

export { App };
