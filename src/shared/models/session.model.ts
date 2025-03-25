export interface Session {
    id: string;
    userId: string;
    refreshToken: string;
    userAgent: string;
    ipAddress: string;
    expiresAt: number;
    createdAt: number;
}
