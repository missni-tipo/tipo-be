import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const userAgent = req.headers["user-agent"];
    const referer = req.headers["referer"] || req.headers["referrer"];

    res.json({
        message: `Welcome to API ${process.env.APP_NAME} ${process.env.API_VERSION}`,
        data: {
            ip: ip,
            userAgent: userAgent,
            referer: referer,
            timestamp: Date.now(),
        },
    });
});

export default router;
