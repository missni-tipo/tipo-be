export interface UserVoucher {
    id: string;
    userId: string;
    voucherId: string;
    isUsed: boolean;
    usedAt?: number;
    createdAt: number;
}
