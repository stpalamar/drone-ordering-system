const UserValidationRule = {
    PASSWORD: {
        MIN_LENGTH: 6,
        MAX_LENGTH: 20,
    },
    FIRST_NAME: {
        MIN_LENGTH: 2,
        MAX_LENGTH: 30,
    },
    LAST_NAME: {
        MIN_LENGTH: 2,
        MAX_LENGTH: 30,
    },
    PHONE: {
        LENGTH: 10,
        PATTERN: /^\d{10}$/,
    },
} as const;

export { UserValidationRule };
