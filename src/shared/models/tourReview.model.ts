export interface TourReview {
    id: string;
    tourId: string;
    userId: string;
    review?: string;
    rate: number;
    createdAt: number;
}
