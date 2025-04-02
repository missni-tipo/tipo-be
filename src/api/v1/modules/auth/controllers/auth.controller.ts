import { NextFunction, Request, Response } from "express";
import { RegisterDto } from "../dtos/auth.dto";
import { AuthService } from "../services/auth.service";

export class AuthController {
    constructor(private authService: AuthService) {}

    register = async (req: Request, res: Response, next: NextFunction) => {
        const data: RegisterDto = req.body;

        const result = await this.authService.register(data);

        if (result) {
            res.status(201).json({
                status: "success",
                message: "Registration successful. Please verify your email.",
                data: result,
            });
        }

        res.status(201).json({
            status: "success",
            message:
                "The token was successfully sent via email, please check your email for verification.",
            data: result,
        });
    };

    // login = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const data: LoginDto = req.body;
    //         const userAgent = req.headers["user-agent"] || "";
    //         const ipAddress = req.ip || "";

    //         const result = await this.service.login(data, userAgent, ipAddress);

    //         res.status(200).json({
    //             status: "success",
    //             message: "Login successful",
    //             data: result,
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // };

    // verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const data: VerifyOtpDto = req.body;
    //         const result = await this.service.verifyOtp(data);

    //         res.status(200).json({
    //             status: "success",
    //             message: "OTP verification successful",
    //             data: result,
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // };

    // refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const data: RefreshTokenDto = req.body;
    //         const result = await this.service.refreshToken(data);

    //         res.status(200).json({
    //             status: "success",
    //             message: "Token refreshed successfully",
    //             data: result,
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // };

    // forgotPassword = async (
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    // ) => {
    //     try {
    //         const data: ForgotPasswordDto = req.body;
    //         await this.service.forgotPassword(data);

    //         res.status(200).json({
    //             status: "success",
    //             message:
    //                 "If your email is registered, you will receive a reset link",
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // };

    // resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const data: ResetPasswordDto = req.body;
    //         await this.service.resetPassword(data);

    //         res.status(200).json({
    //             status: "success",
    //             message: "Password reset successful",
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // };

    // logout = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const { refreshToken } = req.body;
    //         await this.service.logout(refreshToken);

    //         res.status(200).json({
    //             status: "success",
    //             message: "Logout successful",
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // };
}
