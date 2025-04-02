import { GenderType, StatusType } from "@prisma/client";

export interface UserModel {
    id: string;
    fullName: string;
    gender: GenderType | null;
    email: string;
    phoneNumber: string | null;
    passwordHash: string | null;
    pinHash: string | null;
    status: StatusType;
    picture: string | null;
    birthdate: Date | null;
    domicile: string | null;
    profileCompletedAt: bigint | null;
    createdAt: bigint;
    updatedAt: bigint | null;
}
