import { AppError } from "@/core/errors/appError.error";
import { NextFunction, Request, Response } from "express";
import { env } from "@/config/environment";
import { BaseRepository } from "@/core/repositories/base.repository";
import { verifyJWT } from "../utils/jwt.util";
import { User } from "@prisma/client";
import { UserService } from "@/core/services/user.service";
import { UserRepository } from "@/core/repositories/user.repository";

const userService = new UserService(new UserRepository());

export interface AuthRequest extends Request {
    user?: {
        id: string;
        fullName: string;
        status: string;
        roles: object;
    };
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

    const decoded = (await verifyJWT(token, env.JWT_SECRET)) as { id: string };

    const user = await userService.getUserWithRoles(decoded.id);

    req.user = user;

    next();
};
