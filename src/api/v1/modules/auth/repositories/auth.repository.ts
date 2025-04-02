import { BaseRepository } from "@/core/repositories/base.repository";
import { StatusType } from "@/shared/enums/status.enum";
import { UserModel } from "@/shared/models/user.model";
import { PrismaClient, User } from "@prisma/client";

export class AuthRepository extends BaseRepository<User> {
    constructor(prisma: PrismaClient) {
        super(prisma.user);
    }

    async findByEmail(email: string) {
        return this.findOne({
            email,
        });
    }

    async createUser(data: Partial<UserModel>): Promise<UserModel> {
        return this.create({ ...data, status: StatusType.INACTIVE });
    }

    async updateUserRegistration(
        id: string,
        data: Partial<UserModel>
    ): Promise<Partial<UserModel>> {
        return await this.update(
            { id: id },
            { ...data, status: StatusType.INACTIVE }
        );
    }

    async updatePassword(id: string, passwordHash: string) {
        return this.update({ id }, { passwordHash });
    }

    async activateUser(id: string) {
        return this.update({ id }, { status: StatusType.ACTIVE });
    }

    async runAuthTransaction<T>(
        action: Parameters<typeof this.runTransaction>[0]
    ): Promise<T> {
        return this.runTransaction(action);
    }
}
