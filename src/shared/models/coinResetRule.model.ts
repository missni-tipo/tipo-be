import { ResetFrequencyType } from "../enums/resetFrequency.enum";

export interface CoinResetRule {
    id: string;
    resetEnabled: boolean;
    resetDate?: number;
    resetTime?: number;
    resetFrequency: ResetFrequencyType;
    resetAdminId: string;
    lastUpdatedAt?: number;
    updatedAt?: number;
}
