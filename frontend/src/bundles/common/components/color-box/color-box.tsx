type Properties = {
    color: string;
};

const ColorBox: React.FC<Properties> = ({ color }) => {
    return (
        <div
            className="w-10 h-10 rounded-md border border-gray-300 "
            style={{ backgroundColor: color }}
        ></div>
    );
};

export { ColorBox };
