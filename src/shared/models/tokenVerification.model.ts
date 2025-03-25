import { TokenVerificationType } from "../enums/tokenVerification.enum";

export interface TokenVerification {
    id: string;
    userId: string;
    email: string;
    token: string;
    type: TokenVerificationType;
    expires: number;
    isUsed: boolean;
    createdAt: number;
}
