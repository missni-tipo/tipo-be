import { GenderType } from "../enums/gender.enum";
import { StatusType } from "../enums/status.enum";

export interface User {
    id: string;
    fullName: string;
    gender?: GenderType;
    email: string;
    phoneNumber?: string;
    passwordHash?: string;
    pinHash?: string;
    status: StatusType;
    picture?: string;
    birthdate?: Date;
    domicile?: string;
    profileCompletedAt?: number;
    createdAt: number;
    updatedAt?: number;
}
