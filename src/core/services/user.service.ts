import { UserRepository } from "../repositories/user.repository";
import { IMappedRequestUser } from "@/shared/interfaces/user.interface";

export class UserService {
    constructor(private userRepo: UserRepository) {}

    async getUserWithRoles(userId: string): Promise<IMappedRequestUser> {
        const userWithRoles = await this.userRepo.findUserWithRoles(userId);
        if (!userWithRoles) {
            throw new Error("User not found");
        }

        const mappedUser: IMappedRequestUser = {
            id: userWithRoles.id,
            fullName: userWithRoles.fullName,
            status: userWithRoles.status,
            roles: userWithRoles.roles.map((role) => {
                return {
                    id: role.role.id,
                    name: role.role.name,
                };
            }),
        };

        return mappedUser;
    }
}
