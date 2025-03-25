export interface OAuthAccount {
    id: string;
    userId: string;
    provider: string;
    providerId: string;
    refreshToken?: string;
    accessToken?: string;
    expiresAt?: number;
    createdAt: number;
    updatedAt?: number;
}
