import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { connectOrm } from 'src/database/drizzle';

@Module({
  controllers: [UserController],
  providers: [UserService, 
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        const db = await connectOrm();
        return db;
      },
    },],
})
export class UserModule {}
