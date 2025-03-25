export interface UserCoin {
    id: string;
    userId: string;
    balance: number;
    lastResetAt?: number;
    version: number;
    createdAt: number;
    updatedAt?: number;
}
