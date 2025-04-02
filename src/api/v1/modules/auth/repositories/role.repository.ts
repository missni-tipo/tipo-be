import { BaseRepository } from "@/core/repositories/base.repository";
import { RoleModel } from "@/shared/models/role.model";
import { PrismaClient, Role } from "@prisma/client";

export class RoleRepository extends BaseRepository<Role> {
    constructor(prisma: PrismaClient) {
        super(prisma.role);
    }

    async findRoleByName(data: Partial<RoleModel>): Promise<RoleModel | null> {
        return await this.findOne(data);
    }
}
