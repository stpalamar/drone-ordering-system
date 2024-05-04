type ProductTypesDto = {
    purposes: {
        purpose: string;
        wingsTypes: string[];
    }[];
    wingsTypes: {
        wingsType: string;
        purposes: string[];
    }[];
};

export { type ProductTypesDto };
