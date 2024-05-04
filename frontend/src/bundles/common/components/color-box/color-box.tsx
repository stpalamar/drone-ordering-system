import { cn } from '~/bundles/common/lib/utils.js';

type Properties = {
    color: string;
    onClick: (color: string) => void;
};

const ColorBox: React.FC<Properties> = ({ color, onClick }) => {
    return (
        <button onClick={() => onClick(color)} type="button">
            <div
                className={cn('w-10 h-10 rounded-md border border-gray-300')}
                style={{ backgroundColor: color }}
            ></div>
        </button>
    );
};

export { ColorBox };
