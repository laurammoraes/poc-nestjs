import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentTrackingsController } from './treatment_trackings.controller';
import { TreatmentTrackingsService } from './treatment_trackings.service';

describe('TreatmentTrackingsController', () => {
  let controller: TreatmentTrackingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreatmentTrackingsController],
      providers: [TreatmentTrackingsService],
    }).compile();

    controller = module.get<TreatmentTrackingsController>(TreatmentTrackingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
