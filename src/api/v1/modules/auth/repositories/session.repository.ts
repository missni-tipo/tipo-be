import { BaseRepository } from "@/core/repositories/base.repository";
import { PrismaClient, Session } from "@prisma/client";

export class SessionRepository extends BaseRepository<Session> {
    constructor(prisma: PrismaClient) {
        super(prisma.session);
    }

    async findSessionByRefreshToken(refreshToken: string) {
        return this.findOne({
            refreshToken,
        });
    }

    async createSession(data: Partial<Session>) {
        return this.create(data);
    }

    async deleteSession(refreshToken: string) {
        return this.delete({ refreshToken: refreshToken });
    }
}
