import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { connectOrm } from 'src/database/drizzle';
import { BaseService } from 'src/base/base.service';
import { BaseRepository } from 'src/base/base.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, 
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        const db = await connectOrm();
        return db;
      },
    },
    BaseService, BaseRepository],
})
export class UserModule {}
