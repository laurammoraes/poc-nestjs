import { Module } from '@nestjs/common';
import { TreatmentTrackingsService } from './treatment_trackings.service';
import { TreatmentTrackingsController } from './treatment_trackings.controller';
import { connectOrm } from 'src/database/drizzle';

@Module({
  controllers: [TreatmentTrackingsController],
  providers: [TreatmentTrackingsService, {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const db = await connectOrm();
      return db;
    },
  },],
})
export class TreatmentTrackingsModule {}
