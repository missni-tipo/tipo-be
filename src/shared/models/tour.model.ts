import { StatusType } from "../enums/status.enum";
import { TourCategoryType } from "../enums/tourCategory.enum";

export interface Tour {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    description?: string;
    location: string;
    latitude?: number;
    longitude?: number;
    category: TourCategoryType;
    status: StatusType;
    rating: number;
    reviewCount: number;
    picture: string[];
    createdBy: string;
    createdAt: number;
    updatedAt?: number;
}
