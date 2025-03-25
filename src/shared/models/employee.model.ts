import { StatusType } from "../enums/status.enum";

export interface Employee {
    id: string;
    tourId: string;
    fullName: string;
    phone: string;
    status: StatusType;
    createdAt: number;
    updatedAt?: number;
}
