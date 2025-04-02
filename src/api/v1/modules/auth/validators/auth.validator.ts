import { AppError } from "@/core/errors/appError.error";
import { body } from "express-validator";

export class AuthValidator {
    static validateRegister = [
        body("fullName")
            .isString()
            .notEmpty()
            .withMessage("Full Name is required")
            .isLength({ min: 3, max: 100 })
            .withMessage("Full Name must be between 3 and 100 characters"),

        body("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email format"),

        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long")
            .custom((value) => {
                if (
                    !/[A-Z]/.test(value) ||
                    !/[0-9]/.test(value) ||
                    !/[!@#$%^&*]/.test(value)
                ) {
                    throw new AppError(
                        401,
                        "Password must contain at least one uppercase letter (A-Z), one number (0-9), and one special character (!@#$%^&*)"
                    );
                }
                return true;
            }),

        body("confirmPassword")
            .trim()
            .notEmpty()
            .withMessage("Confirm Password is required")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Confirm Password does not match Password");
                }
                return true;
            }),

        body("phoneNumber")
            .optional()
            .isNumeric()
            .withMessage("Phone Number must be numeric")
            .isLength({ min: 10, max: 15 })
            .withMessage("Phone Number must be between 10 and 15 digits"),
    ];

    static validateLogin = [
        body("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email format"),

        body("password").trim().notEmpty().withMessage("Password is required"),
    ];

    static validateOtpVerification = [
        body("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email format"),

        body("otp")
            .isNumeric()
            .withMessage("OTP must be numeric")
            .isLength({ min: 6, max: 6 })
            .withMessage("OTP must be exactly 6 digits"),
    ];

    static validateRefreshToken = [
        body("refreshToken")
            .notEmpty()
            .withMessage("Refresh Token is required"),
    ];

    static validateForgotPassword = [
        body("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email format"),
    ];

    static validateResetPassword = [
        body("otp").notEmpty().withMessage("OTP is required"),

        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long")
            .custom((value) => {
                if (
                    !/[A-Z]/.test(value) ||
                    !/[0-9]/.test(value) ||
                    !/[!@#$%^&*]/.test(value)
                ) {
                    throw new AppError(
                        401,
                        "Password must contain at least one uppercase letter (A-Z), one number (0-9), and one special character (!@#$%^&*)"
                    );
                }
                return true;
            }),

        body("confirmPassword")
            .trim()
            .notEmpty()
            .withMessage("Confirm Password is required")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Confirm Password does not match Password");
                }
                return true;
            }),
    ];
}
