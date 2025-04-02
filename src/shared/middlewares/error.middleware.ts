import { NextFunction, Request, Response } from "express";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const errors = err.errors || null;

    console.error({ message, errors });

    return res.status(statusCode).json({ success: false, message, errors });
};
