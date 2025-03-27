import { AppError } from "@/core/errors/appError.error";
import { NextFunction, Request, Response } from "express";
import { env } from "@/config/environment";
import { BaseRepository } from "@/core/repositories/base.repository";
import { verifyJWT } from "../utils/jwt.util";
import { User } from "@prisma/client";

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        fullName: string;
        roles: object;
    };
}

export interface userRolesData {
    id: string;
    name: string;
}

export const Authenticate = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
    repo: BaseRepository<User>
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError(401, "Authentication required");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        throw new AppError(401, "Authentication required");
    }

    const decoded = (await verifyJWT(token, env.JWT_SECRET)) as any;

    type UserWithRoles = User & {
        roles: { role: userRolesData }[];
    };

    const user = (await repo.findOne(
        { id: decoded.id },
        {
            roles: {
                include: { role: true },
            },
        }
    )) as UserWithRoles;

    if (!user) {
        throw new AppError(404, "User not found");
    }

    req.user = {
        userId: user.id,
        fullName: user.fullName,
        roles: user.roles.map((item) => ({
            id: item.role.id,
            name: item.role.name,
        })),
    };

    next();
};
