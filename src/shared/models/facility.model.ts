export interface Facility {
    id: string;
    tourId: string;
    facilityTypeId: number;
    name: string;
    barcode: string;
    isActive: boolean;
    createdAt: number;
    updatedAt?: number;
}
