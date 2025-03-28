import { env } from "@/config/environment";
import { createJWT } from "./jwt.util";
import crypto from "crypto";

export const generateToken = (payload: any, expiresIn = env.JWT_EXPIRES_IN) => {
    return createJWT(payload, env.JWT_SECRET, { expiresIn });
};

export const generateRefreshToken = () => {
    return crypto.randomBytes(40).toString("hex");
};

export const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
