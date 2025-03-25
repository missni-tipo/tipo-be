export interface BaseRepository<T> {
    findById(id: string): Promise<T | null>;
    findOne(where: object, include?: object): Promise<T | null>;
    findAll(params?: {
        skip?: number;
        take?: number;
        where?: object;
        include?: object;
        orderBy?: object;
    }): Promise<T[]>;
    create(data: Partial<T>): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T>;
    delete(id: string): Promise<void>;
}
