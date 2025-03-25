export interface CoinSetting {
    id: string;
    pricePerCoin: number;
    minPurchase: number;
    maxPurchase: number;
    createdAt: number;
    updatedAt?: number;
}
