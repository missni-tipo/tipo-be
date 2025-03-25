import { TransactionType } from "../enums/Transaction.enum";

export interface CoinTransaction {
    id: string;
    userId: string;
    transactionType: TransactionType;
    amount: number;
    priceTotal?: number;
    relatedId?: string;
    createdAt: number;
}
