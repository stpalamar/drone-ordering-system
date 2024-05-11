const getFiltersArray = (query: string | null): string[] | null => {
    if (!query) {
        return null;
    }
    const filters = query.split(',');
    if (!filters) {
        return null;
    }
    return filters;
};

export { getFiltersArray };
