type PagedResponse<T> = {
    items: T[];
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
};

export { type PagedResponse };
