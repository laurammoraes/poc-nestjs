import { Module } from '@nestjs/common';
import { BaseService } from './base.service';
import { BaseRepository } from './base.repository';
import { connectOrm } from 'src/database/drizzle';

@Module({
  imports: [],
  controllers: [],
  providers: [{
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const db = await connectOrm();
      return db;
    },
  },BaseService, BaseRepository],
})
export class BaseModule {}
