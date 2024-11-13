import { Inject, Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "./base.abstract.repository";
import { and, eq, isNull } from "drizzle-orm";

@Injectable()
export class BaseRepository extends BaseAbstractRepository<Entity> {
    constructor(@Inject('DATABASE_CONNECTION') private db){
        super()
    }

    async create(data, entity){
         await this.db.insert(entity).values(data).execute()
    }

    async getAll(entity){
        return await this.db.select().from(entity).where(isNull(entity.deletedAt)).execute()
    }

    async getById(data, entity){
        return await this.db.select().from(entity).where(and(eq(entity.id, data),isNull(entity.deletedAt))).execute()
    }

    async update(data, entity){
        return await this.db.
    }

    async delete(data, entity){
        return await this.db.
    }
}