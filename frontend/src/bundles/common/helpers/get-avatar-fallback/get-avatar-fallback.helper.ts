const getAvatarFallback = (firstName: string, lastName: string): string => {
    return `${firstName[0]}${lastName[0]}`;
};

export { getAvatarFallback };
