export declare enum SortBy {
    PRICE = "price",
    DISTANCE = "distance",
    RATING = "rating",
    POPULARITY = "popularity"
}
export declare class SearchQueryDto {
    address?: string;
    lat?: number;
    lng?: number;
    areaSqM?: number;
    sortBy?: SortBy;
    sortOrder?: 'ASC' | 'DESC';
    page?: number;
    limit?: number;
}
