import { BaseRepository } from "@/core/repositories/base.repository";
import { UserRoleModel } from "@/shared/models/userRole.model";
import { PrismaClient, UserRole } from "@prisma/client";

export class UserRoleRepository extends BaseRepository<UserRole> {
    constructor(prisma: PrismaClient) {
        super(prisma.userRole);
    }
    async createUserRole(data: Partial<UserRoleModel>): Promise<UserRoleModel> {
        return this.create(data);
    }
}
