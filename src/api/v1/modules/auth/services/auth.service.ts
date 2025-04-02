import { AppError } from "@/core/errors/appError.error";
import { UserModel } from "@/shared/models/user.model";
import { AuthRepository } from "../repositories/auth.repository";
import {
    BuildOtpDetailsResponseDto,
    RegisterDto,
    RegisterResponseDto,
} from "../dtos/auth.dto";
import { hashPassword } from "@/shared/utils/password.util";
import { generateOtp } from "@/shared/utils/token.utils";
import { env } from "@/config/environment";
import { TokenVerificationRepository } from "../repositories/tokenVerification.repository";
import { TokenVerificationType } from "@/shared/enums/tokenVerification.enum";
import { StatusType } from "@/shared/enums/status.enum";
import { UserRoleRepository } from "../repositories/userRole.repository";
import { RoleRepository } from "../repositories/role.repository";
import { roleBase } from "@/shared/enums/roleBase.enum";
import { RoleModel } from "@/shared/models/role.model";
import { string } from "zod";

export class AuthService {
    constructor(
        private authRepo: AuthRepository,
        private tokenVerifyRepo: TokenVerificationRepository,
        private userRoleRepo: UserRoleRepository,
        private roleRepo: RoleRepository
    ) {}

    private async BuildOtpData(): Promise<{
        otpDetails: BuildOtpDetailsResponseDto;
        otp: number;
    }> {
        /**
         * Builds OTP data for email verification.
         *
         * @param otp The OTP generated for verification.
         * @returns An object containing the OTP token, usage status, expiration date, and token type.
         */

        const otp = generateOtp();
        const hashedOtp = await hashPassword(otp);

        return {
            otpDetails: {
                token: hashedOtp,
                isUsed: false,
                expires: BigInt(Math.floor(Date.now() + env.OTP_EXPIRES_IN)),
                type: TokenVerificationType.EMAIL_VERIFICATION,
            },
            otp: Number(otp),
        };
    }

    private async BuildUserRegistration(data: RegisterDto) {
        /**
         * Builds the user data for registration.
         *
         * @param data The registration data from the user.
         * @returns An object containing the user's data with a hashed password.
         */
        const hashedPassword = await hashPassword(data.password);

        return {
            fullName: data.fullName,
            email: data.email,
            passwordHash: hashedPassword,
            phoneNumber: data.phoneNumber,
        };
    }

    async register(data: RegisterDto): Promise<RegisterResponseDto | boolean> {
        /**
         * Handles the process of user registration.
         *
         * - Checks if the email is already registered.
         * - If the email is already registered and the status is inactive, updates the user data.
         * - If the email is not registered, creates a new user and assigns the appropriate role.
         * - Sends OTP for email verification.
         *
         * @param data The registration data of the user.
         * @returns The registered user object or `false` if the email is already registered.
         */
        const existingUser = await this.authRepo.findByEmail(data.email);

        // If the user already exists and their status is active, throw an error
        if (existingUser) {
            if (existingUser.status === StatusType.ACTIVE)
                throw new AppError(400, "Email is already registered");

            // If the user is inactive, update the token verification and user data
            const { otp } = await this.updateTokenVerification(data.email);

            const registerData = await this.BuildUserRegistration(data);
            await this.authRepo.updateUserRegistration(
                existingUser.id,
                registerData
            );

            console.log({ otp });

            return false; // Return false, used in the controller to determine whether the registration response was successful or just whether the OTP response was successfully sent
        }

        const checkExisitingRole = await this.roleRepo.findRoleByName({
            name: roleBase.CUSTOMER,
        });
        if (!checkExisitingRole) throw new AppError(404, "Role not found");

        // Run a transaction for registering a new user and generating OTP
        const registerTransaction = await this.authRepo.runAuthTransaction<{
            user: RegisterResponseDto;
            otp: number;
        }>(async (tx) => {
            const registerData = await this.BuildUserRegistration(data);

            const createNewUser = await this.authRepo.createUser(registerData);

            await this.userRoleRepo.createUserRole({
                userId: createNewUser.id,
                roleId: checkExisitingRole.id,
            });

            const { otpDetails, otp } = await this.BuildOtpData();

            // Store the OTP token in the database
            await this.tokenVerifyRepo.createTokenVerification({
                userId: createNewUser.id,
                email: createNewUser.email,
                ...otpDetails,
            });

            return { createNewUser, otp };
        });

        const { user, otp } = registerTransaction;
        console.log({ data: otp });

        return user;
    }

    async updateTokenVerification(email: string): Promise<{ otp: number }> {
        /**
         * Updates the token verification for a given email.
         *
         * - Checks if the existing token is expired or used.
         * - If the token is still valid, throws an error.
         * - If the token is expired or unused, generates a new OTP and updates the verification token.
         *
         * @param email The email of the user whose token verification needs to be updated.
         * @returns `true` if the token was successfully updated.
         */
        const storedToken =
            await this.tokenVerifyRepo.findTokenVerificationByEmail(email);
        if (!storedToken) throw new AppError(404, "Token Not Found");

        // Check if the token is still valid
        if (BigInt(Date.now()) < storedToken?.expires && !storedToken.isUsed) {
            throw new AppError(400, "Token is still valid and has not expired");
        }

        // Generate a new OTP and update the token

        const { otpDetails, otp } = await this.BuildOtpData();

        await this.tokenVerifyRepo.updateTokenVerification(email, otpDetails);

        return { otp };
    }

    // async login(
    //     data: LoginDto,
    //     userAgent: string,
    //     ipAddress: string
    // ): Promise<AuthResponseDto> {
    //     const user = await this.repository.findUserByEmail(data.email);

    //     if (!user) {
    //         throw new AppError("Invalid credentials", 401);
    //     }

    //     if (!user.passwordHash) {
    //         throw new AppError("Invalid login method", 400);
    //     }

    //     const isPasswordValid = await comparePassword(
    //         data.password,
    //         user.passwordHash
    //     );

    //     if (!isPasswordValid) {
    //         throw new AppError("Invalid credentials", 401);
    //     }

    //     if (user.status !== Status.ACTIVE) {
    //         throw new AppError("Account not activated", 403);
    //     }

    //     // Generate tokens
    //     const accessToken = generateToken({ id: user.id, email: user.email });
    //     const refreshToken = generateRefreshToken();
    //     const expiresAt = BigInt(Date.now() + env.REFRESH_TOKEN_EXPIRES_IN);

    //     // Store session
    //     await this.repository.createSession({
    //         userId: user.id,
    //         refreshToken,
    //         userAgent,
    //         ipAddress,
    //         expiresAt,
    //     });

    //     return {
    //         user: {
    //             id: user.id,
    //             email: user.email,
    //             fullName: user.fullName,
    //             status: user.status,
    //         },
    //         accessToken,
    //         refreshToken,
    //     };
    // }

    // async verifyOtp(
    //     data: VerifyOtpDto
    // ): Promise<{ accessToken: string; refreshToken: string }> {
    //     const user = await this.repository.findUserByEmail(data.email);

    //     if (!user) {
    //         throw new AppError("User not found", 404);
    //     }

    //     // Find verification token
    //     const verification = await this.repository.findVerificationToken(
    //         data.otp
    //     );

    //     if (!verification || verification.email !== data.email) {
    //         throw new AppError("Invalid OTP", 400);
    //     }

    //     if (verification.isUsed) {
    //         throw new AppError("OTP already used", 400);
    //     }

    //     const now = BigInt(Date.now());
    //     if (verification.expires < now) {
    //         throw new AppError("OTP expired", 400);
    //     }

    //     // Mark token as used
    //     await this.repository.markTokenAsUsed(verification.id);

    //     // Activate user if this was for email verification
    //     if (verification.type === TokenVerificationType.EMAIL_VERIFICATION) {
    //         await this.repository.activateUser(user.id);
    //     }

    //     // Generate tokens
    //     const accessToken = generateToken({ id: user.id, email: user.email });
    //     const refreshToken = generateRefreshToken();
    //     const expiresAt = BigInt(Date.now() + env.REFRESH_TOKEN_EXPIRES_IN);

    //     // Create session (would need user agent and IP in real implementation)
    //     await this.repository.createSession({
    //         userId: user.id,
    //         refreshToken,
    //         userAgent: "verification",
    //         ipAddress: "0.0.0.0",
    //         expiresAt,
    //     });

    //     return {
    //         accessToken,
    //         refreshToken,
    //     };
    // }

    // async refreshToken(
    //     data: RefreshTokenDto
    // ): Promise<{ accessToken: string; refreshToken: string }> {
    //     const session = await this.repository.findSessionByRefreshToken(
    //         data.refreshToken
    //     );

    //     if (!session) {
    //         throw new AppError("Invalid refresh token", 401);
    //     }

    //     const now = BigInt(Date.now());
    //     if (session.expiresAt < now) {
    //         await this.repository.deleteSession(data.refreshToken);
    //         throw new AppError("Refresh token expired", 401);
    //     }

    //     // Generate new tokens
    //     const accessToken = generateToken({
    //         id: session.user.id,
    //         email: session.user.email,
    //     });
    //     const refreshToken = generateRefreshToken();
    //     const expiresAt = BigInt(Date.now() + env.REFRESH_TOKEN_EXPIRES_IN);

    //     // Delete old session
    //     await this.repository.deleteSession(data.refreshToken);

    //     // Create new session
    //     await this.repository.createSession({
    //         userId: session.user.id,
    //         refreshToken,
    //         userAgent: session.userAgent,
    //         ipAddress: session.ipAddress,
    //         expiresAt,
    //     });

    //     return {
    //         accessToken,
    //         refreshToken,
    //     };
    // }

    // async forgotPassword(data: ForgotPasswordDto): Promise<void> {
    //     const user = await this.repository.findUserByEmail(data.email);

    //     if (!user) {
    //         // We don't want to reveal that the email doesn't exist
    //         return;
    //     }

    //     // Generate reset token
    //     const resetToken = generateOtp();
    //     const now = Date.now();
    //     const expires = BigInt(now + env.OTP_EXPIRES_IN);

    //     await this.repository.createVerificationToken({
    //         userId: user.id,
    //         email: user.email,
    //         token: resetToken,
    //         type: TokenVerificationType.PASSWORD_RESET,
    //         expires,
    //     });

    //     // In a real app, you would send reset token via email here
    //     logger.info(`Password reset token for ${user.email}: ${resetToken}`);
    // }

    // async resetPassword(data: ResetPasswordDto): Promise<void> {
    //     const verification = await this.repository.findVerificationToken(
    //         data.token
    //     );

    //     if (!verification) {
    //         throw new AppError("Invalid token", 400);
    //     }

    //     if (verification.isUsed) {
    //         throw new AppError("Token already used", 400);
    //     }

    //     const now = BigInt(Date.now());
    //     if (verification.expires < now) {
    //         throw new AppError("Token expired", 400);
    //     }

    //     if (verification.type !== TokenVerificationType.PASSWORD_RESET) {
    //         throw new AppError("Invalid token type", 400);
    //     }

    //     // Hash new password
    //     const passwordHash = await hashPassword(data.password);

    //     // Update user password
    //     await this.repository.updateUserPassword(
    //         verification.userId,
    //         passwordHash
    //     );

    //     // Mark token as used
    //     await this.repository.markTokenAsUsed(verification.id);
    // }

    // async logout(refreshToken: string): Promise<void> {
    //     try {
    //         await this.repository.deleteSession(refreshToken);
    //     } catch (error) {
    //         // Just log the error, don't throw
    //         logger.error("Error during logout:", error);
    //     }
    // }
}
