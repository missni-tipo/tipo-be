import { DiscountType } from "../enums/discount.enum";

export interface Promotion {
    id: string;
    tourId?: string;
    name: string;
    description?: string;
    discountType: DiscountType;
    discountValue: number;
    maxDiscount?: number;
    minSpend?: number;
    quota: number;
    usedQuota: number;
    startDate: number;
    endDate: number;
    isActive: boolean;
    createdAt: number;
    updatedAt?: number;
}
