export declare enum SortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class SearchQueryDto {
    location?: string;
    date?: string;
    schedule?: string;
    cleaningType?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: SortOrder;
    page?: number;
    limit?: number;
}
