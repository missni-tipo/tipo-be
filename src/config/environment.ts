import dotenv from "dotenv";
dotenv.config();

export const env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    JWT_SECRET: process.env.JWT_SECRET || "tipo-secret-key",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
    REFRESH_TOKEN_EXPIRES_IN:
        Number(process.env.REFRESH_TOKEN_EXPIRES_IN) ||
        30 * 24 * 60 * 60 * 1000,
    OTP_EXPIRES_IN: Number(process.env.OTP_EXPIRES_IN) || 10 * 60 * 1000,
};
