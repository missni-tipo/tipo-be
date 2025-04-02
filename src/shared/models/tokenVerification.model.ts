import { TokenVerificationType } from "@prisma/client";

export interface TokenVerificationModel {
    id: string;
    userId: string;
    email: string;
    token: string;
    type: TokenVerificationType;
    expires: bigint;
    isUsed: boolean;
    createdAt: bigint;
}
