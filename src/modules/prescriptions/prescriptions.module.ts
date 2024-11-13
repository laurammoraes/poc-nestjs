import { Module } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { PrescriptionsController } from './prescriptions.controller';
import { connectOrm } from 'src/database/drizzle';

@Module({
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService, {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const db = await connectOrm();
      return db;
    },
  },],
})
export class PrescriptionsModule {}
