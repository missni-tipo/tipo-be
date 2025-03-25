export interface AuditLog {
    id: string;
    userId: string;
    action: string;
    entity: string;
    entityId: string;
    timestamp: number;
}
