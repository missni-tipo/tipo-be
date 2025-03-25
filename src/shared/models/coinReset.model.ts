export interface CoinReset {
    id: string;
    adminId: string;
    userId: string;
    previousBalance: number;
    resetReason?: string;
    resetAt: number;
}
