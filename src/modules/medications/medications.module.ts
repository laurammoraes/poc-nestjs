import { Module } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';
import { connectOrm } from 'src/database/drizzle';
import { BaseService } from 'src/base/base.service';
import { BaseRepository } from 'src/base/base.repository';

@Module({
  controllers: [MedicationsController],
  providers: [MedicationsService, {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const db = await connectOrm();
      return db;
    },
  },
  BaseService, BaseRepository],
})
export class MedicationsModule {}
