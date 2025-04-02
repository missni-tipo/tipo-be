import { AppError } from "@/core/errors/appError.error";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const mappedErrors = errors.array().reduce(
            (acc, err) => {
                const field = (err as any).path;
                acc[field] = acc[field] || [];
                acc[field].push(err.msg);
                return acc;
            },
            {} as Record<string, string[]>
        );

        throw new AppError(400, "Validation Input Failed", mappedErrors);
    }

    next();
};

export default validateRequest;
