import { Info } from 'lucide-react';

import { Button } from '~/bundles/common/components/ui/button.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useCallback, useNavigate } from '~/bundles/common/hooks/hooks.js';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    const redirectToHome = useCallback(() => {
        navigate(AppRoute.ROOT);
    }, [navigate]);

    return (
        <div className="h-screen flex items-center justify-center flex-col">
            <div className="flex flex-row items-center justify-center mb-4">
                <Info className="size-6 mr-2" />
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Page was not found
                </h3>
            </div>

            <Button variant="secondary" onClick={redirectToHome}>
                Back to home
            </Button>
        </div>
    );
};

export { NotFound };
