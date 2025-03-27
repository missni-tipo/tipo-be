import { NextFunction, Request, Response } from "express";
import { AuthRequest, userRolesData } from "./auth.midleware";
import { AppError } from "@/core/errors/appError.error";

export const authorize = (allowedRoles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if (!req.user) throw new AppError(404, "Authentication required");

            const userRoles = req.user.roles as userRolesData[];

            const hasRole = userRoles.some((role) =>
                allowedRoles.includes(role.name)
            );

            if (!hasRole) {
                throw new AppError(403, "Insufficient permissions");
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};
