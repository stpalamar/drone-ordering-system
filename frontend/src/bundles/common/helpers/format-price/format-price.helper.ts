const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
});

const formatPrice = (price: number): string => {
    return formatter.format(price);
};

export { formatPrice };
