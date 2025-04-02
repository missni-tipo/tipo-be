import { PrismaClient } from "@prisma/client";
import prisma from "@/config/prisma";

export class BaseRepository<T> {
    constructor(
        private model: {
            count: (args?: any) => Promise<number>;
            findUnique: (args: any) => Promise<T | null>;
            findMany: (args?: any) => Promise<T[]>;
            findFirst: (args: any) => Promise<T | null>;
            create: (args: any) => Promise<T>;
            update: (args: any) => Promise<T>;
            delete: (args: any) => Promise<T>;
        }
    ) {}

    protected async count(filters?: Partial<T>): Promise<number> {
        return await this.model.count({ where: filters || {} });
    }

    protected async findById(id: string): Promise<T | null> {
        return this.model.findUnique({ where: { id } });
    }

    protected async findOne(
        where: Partial<T>,
        include?: object
    ): Promise<T | null> {
        return this.model.findFirst({ where, include });
    }

    protected async findAll(params?: {
        skip?: number;
        take?: number;
        where?: Partial<T>;
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

    protected async create(data: Partial<T>): Promise<T> {
        return this.model.create({ data });
    }

    protected async update(where: Partial<T>, data: Partial<T>): Promise<T> {
        return this.model.update({ where, data });
    }

    protected async delete(where: Partial<T>): Promise<T> {
        return this.model.delete({ where });
    }

    protected async runTransaction(
        action: (
            tx: Omit<
                PrismaClient,
                | "$connect"
                | "$disconnect"
                | "$on"
                | "$transaction"
                | "$use"
                | "$extends"
            >
        ) => Promise<any>
    ) {
        return prisma.$transaction(action);
    }
}
