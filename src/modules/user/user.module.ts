import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { connectOrm } from 'src/database/drizzle';
import { BaseService } from 'src/base/base.service';
import { BaseRepository } from 'src/base/base.repository';
import { CreateUser } from './use-cases/create';
import { UpdateUser } from './use-cases/update';
import { RemoveUser } from './use-cases/remove';
import { FindUserById } from './use-cases/findById';
import { FindAllUsers } from './use-cases/findAll';

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
    BaseService, BaseRepository, CreateUser, UpdateUser, RemoveUser, FindUserById, FindAllUsers],
})
export class UserModule {}
