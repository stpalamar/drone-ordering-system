import { cn } from '~/bundles/common/lib/utils.js';

type Properties = {
    color: string;
};

const ColorBox: React.FC<Properties> = ({ color }) => {
    return (
        <div
            className={cn('w-10 h-10 rounded-md border border-gray-300 ')}
            style={{ backgroundColor: color }}
        ></div>
    );
};

export { ColorBox };
