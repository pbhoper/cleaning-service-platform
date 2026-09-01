export declare class CleaningCompanyEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    latitude: number;
    longitude: number;
    description: string;
    logo: string;
    serviceTypes: string[];
    pricePerSqM: number;
    basePrices: {
        smallRoom: number;
        largeRoom: number;
        bathroom: number;
    };
    coefficients: Record<string, number>;
    role: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}
