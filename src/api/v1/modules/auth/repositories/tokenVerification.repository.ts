import { BaseRepository } from "@/core/repositories/base.repository";
import { TokenVerificationModel } from "@/shared/models/tokenVerification.model";
import { PrismaClient, TokenVerification as VerifyToken } from "@prisma/client";

export class TokenVerificationRepository extends BaseRepository<VerifyToken> {
    constructor(prisma: PrismaClient) {
        super(prisma.tokenVerification);
    }

    async findTokenVerificationByEmail(
        email: string
    ): Promise<TokenVerificationModel | null> {
        return this.findOne({ email });
    }

    async markTokenAsUsed(id: string): Promise<TokenVerificationModel> {
        return this.update({ id }, { isUsed: true });
    }

    async createTokenVerification(
        data: Partial<TokenVerificationModel>
    ): Promise<TokenVerificationModel> {
        return this.create(data);
    }

    async updateTokenVerification(
        email: string,
        data: Partial<TokenVerificationModel>
    ): Promise<TokenVerificationModel> {
        return this.update({ email }, data);
    }
}
