import { DiscountType } from "../enums/discount.enum";

export interface Voucher {
    id: string;
    facilityId?: string;
    code: string;
    name: string;
    description?: string;
    discountType: DiscountType;
    discountValue: number;
    maxDiscount?: number;
    minSpend?: number;
    quota: number;
    usedQuota: number;
    userId?: string;
    startDate: number;
    endDate: number;
    isActive: boolean;
    createdAt: number;
    updatedAt?: number;
}
