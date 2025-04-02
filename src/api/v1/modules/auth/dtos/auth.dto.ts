import { TokenVerificationType } from "@/shared/enums/tokenVerification.enum";
import { bigint } from "zod";

export interface RegisterDto {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber?: string;
}

export interface RegisterResponseDto {
    user: {
        id: string;
        email: string;
        fullName: string;
        status: string;
    };
}

export interface loginDto {
    email: string;
    password: string;
}

export interface BuildGenerateOtpResponseDto {
    token: string;
    expires: bigint;
    isUsed: boolean;
    type: string;
}

export interface BuildOtpDetailsResponseDto {
    token: string;
    isUsed: boolean;
    expires: bigint;
    type: TokenVerificationType;
}

export interface resendOtpDto {
    email: string;
}

export interface resendOtpResponseDto {
    otp: string;
}

export interface verifyOtpDto {
    email: string;
    otp: number;
}

export interface refreshTokenDto {
    refreshToken: string;
}

export interface formatPassword {
    email: string;
}

export interface resetPassword {
    token: string;
    password: string;
    confirmPassword: string;
}

export interface LoginResponseDto {
    user: {
        id: string;
        email: string;
        fullName: string;
        status: string;
    };
    accessToken: string;
    refreshToken: string;
}
