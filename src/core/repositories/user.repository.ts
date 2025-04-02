import prisma from "@/config/prisma";

export class UserRepository {
    async findUserWithRoles(id: string) {
        return await prisma.user.findFirst({
            where: { id },
            include: {
                roles: {
                    include: {
                        role: true,
                    },
                },
            },
        });
    }
}
