export interface FacilityEmployee {
    id: string;
    facilityId: string;
    employeeId: string;
    position: string;
    startDate: number;
    endDate?: number;
    createdAt: number;
    updatedAt?: number;
}
