import { Inject, Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from './base.abstract.repository';
import { and, eq, isNull } from 'drizzle-orm';

@Injectable()
export class BaseRepository extends BaseAbstractRepository<void> {
  constructor(@Inject('DATABASE_CONNECTION') private db) {
    super();
  }

  async create(data, entity) {
    await this.db.insert(entity).values(data).execute();
  }

  async getAll(entity) {
    return await this.db
      .select()
      .from(entity)
      .where(isNull(entity.deletedAt))
      .execute();
  }

  async getById(data, entity) {
    return await this.db
      .select()
      .from(entity)
      .where(and(eq(entity.id, data), isNull(entity.deletedAt)))
      .execute();
  }

  async update(id, data, entity) {
    return await this.db
      .update(entity)
      .set(data)
      .where(eq(entity.id, id))
      .execute();
  }

  async delete(data, entity) {
    return await this.db
      .update(entity)
      .set({ deletedAt: new Date() })
      .where(eq(entity.id, data))
      .execute();
  }
}
