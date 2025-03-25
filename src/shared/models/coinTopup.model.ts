import { ProcessStatusType } from "../enums/processStatus.enum";

export interface CoinTopup {
    id: string;
    userId: string;
    paymentRef: string;
    amount: number;
    priceTotal: number;
    paymentStatus: ProcessStatusType;
    paymentMethod: string;
    createdAt: number;
    updatedAt?: number;
}
