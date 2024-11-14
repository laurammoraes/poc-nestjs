import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MedicationsModule } from './medications/medications.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { TreatmentTrackingsModule } from './treatment_trackings/treatment_trackings.module';
import { BaseModule } from 'src/base/base.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    UserModule,
    MedicationsModule,
    PrescriptionsModule,
    TreatmentTrackingsModule,
    BaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
