import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentTrackingsService } from './treatment_trackings.service';

describe('TreatmentTrackingsService', () => {
  let service: TreatmentTrackingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreatmentTrackingsService],
    }).compile();

    service = module.get<TreatmentTrackingsService>(TreatmentTrackingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
