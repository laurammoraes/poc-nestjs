import { Module } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';
import { connectOrm } from 'src/database/drizzle';

@Module({
  controllers: [MedicationsController],
  providers: [MedicationsService, {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const db = await connectOrm();
      return db;
    },
  },],
})
export class MedicationsModule {}
