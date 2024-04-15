import { useGetMeQuery } from '~/bundles/auth/auth-api.js';
import { RouterOutlet } from '~/bundles/common/components/components.js';

const App: React.FC = () => {
    void useGetMeQuery();

    return <RouterOutlet />;
};

export { App };
