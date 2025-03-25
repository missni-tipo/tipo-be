import { BaseRepository } from "./base.repository";
import { PrismaClient } from "@prisma/client";

export class PrismaRepository<T> implements BaseRepository<T> {
    constructor(
        private prisma: PrismaClient,
        private model: {
            findUnique: (args: object) => Promise<T | null>;
            findFirst: (args: object) => Promise<T | null>;
            findMany: (args: object) => Promise<T[]>;
            create: (args: { data: Partial<T> }) => Promise<T>;
            update: (args: { where: object; data: Partial<T> }) => Promise<T>;
            delete: (args: { where: object }) => Promise<void>;
        }
    ) {}

    async findById(id: string): Promise<T | null> {
        return this.model.findUnique({ where: { id } });
    }

    async findOne(where: object, include?: object): Promise<T | null> {
        return this.model.findFirst({ where, include });
    }

    async findAll(params?: {
        skip?: number;
        take?: number;
        where?: object;
        include?: object;
        orderBy?: object;
    }): Promise<T[]> {
        return this.model.findMany({
            skip: params?.skip,
            take: params?.take,
            where: params?.where,
            include: params?.include,
            orderBy: params?.orderBy,
        });
    }

    async create(data: Partial<T>): Promise<T> {
        return this.model.create({ data });
    }

    async update(id: string, data: Partial<T>): Promise<T> {
        return this.model.update({ where: { id }, data });
    }

    async delete(id: string): Promise<void> {
        await this.model.delete({ where: { id } });
    }
}
