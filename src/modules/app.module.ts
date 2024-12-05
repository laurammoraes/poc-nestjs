import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { BaseModule } from 'src/base/base.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    UserModule,
    BaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
