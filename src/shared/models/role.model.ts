import { StatusType } from "@prisma/client";

export interface RoleModel {
    id: string;
    name: string;
    description: string;
    status: StatusType;
}
