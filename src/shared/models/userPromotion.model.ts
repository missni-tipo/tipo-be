export interface UserPromotion {
    id: string;
    userId: string;
    promotionId: string;
    isUsed: boolean;
    usedAt?: number;
    createdAt: number;
}
