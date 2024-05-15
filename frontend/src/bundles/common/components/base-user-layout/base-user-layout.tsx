import { RouterOutlet } from '~/bundles/common/components/components.js';

import { Header } from './components/components.js';

const BaseUserLayout: React.FC = () => {
    return (
        <div>
            <Header />
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 relative">
                <RouterOutlet />
            </main>
        </div>
    );
};

export { BaseUserLayout };
