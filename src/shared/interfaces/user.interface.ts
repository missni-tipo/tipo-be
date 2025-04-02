export interface IMappedRequestUser {
    id: string;
    fullName: string;
    status: string;
    roles: { id: string; name: string }[];
}
