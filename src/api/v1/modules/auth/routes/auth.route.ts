import { Router } from "express";
import { AuthController } from "@/api/v1/modules/auth/controllers/auth.controller";
import { AuthRepository } from "@/api/v1/modules/auth/repositories/auth.repository";
import { TokenVerificationRepository } from "@/api/v1/modules/auth/repositories/tokenVerification.repository";
import { AuthService } from "@/api/v1/modules/auth/services/auth.service";
import prisma from "@/config/prisma";
import { AuthValidator } from "../validators/auth.validator";
import validateRequest from "@/shared/middlewares/validateRequest.middleware";
import { RoleRepository } from "../repositories/role.repository";
import { UserRoleRepository } from "../repositories/userRole.repository";

const router = Router();

const authRepo = new AuthRepository(prisma);
const tokenRepo = new TokenVerificationRepository(prisma);
const roleRepo = new RoleRepository(prisma);
const userRoleRepo = new UserRoleRepository(prisma);
const authService = new AuthService(
    authRepo,
    tokenRepo,
    userRoleRepo,
    roleRepo
);
const controller = new AuthController(authService);

router.post(
    "/register",
    AuthValidator.validateRegister,
    validateRequest,
    controller.register.bind(controller)
);
// router.post("/login", loginValidator, controller.login);
// router.post("/verify-otp", verifyOtpValidator, controller.verifyOtp);
// router.post(
//     "/refresh-token",
//     refreshTokenValidator,
//     controller.refreshToken
// );
// router.post(
//     "/forgot-password",
//     forgotPasswordValidator,
//     controller.forgotPassword
// );
// router.post(
//     "/reset-password",
//     resetPasswordValidator,
//     controller.resetPassword
// );
// router.post("/logout", controller.logout);

export { router as authRoutes };
