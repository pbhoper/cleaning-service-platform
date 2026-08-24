export declare class CreateCleaningCompanyDto {
    name: string;
    email: string;
    password: string;
    phone: string;
    address?: string;
    description?: string;
    logo?: string;
    serviceTypes: string[];
    basePrices: {
        smallRoom: number;
        largeRoom: number;
        bathroom: number;
    };
    coefficients: Record<string, number>;
}
