export interface FacilityPricing {
    id: string;
    facilityId: string;
    price: number;
    currency: string;
    startDate: number;
    endDate?: number;
    createdAt: number;
    updatedAt?: number;
}
